const { expect } = require('chai');

const rewardPerWallet = 10;

describe('RewardCoin', function () {
  let RewardCoin;
  let hardhatRewardCoin;

  let owner;
  let addr1;
  let addr2;
  let addr3;
  let addr4;
  let addr5;

  beforeEach(async function () {
    RewardCoin = await ethers.getContractFactory('RewardCoin');
    [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();


    hardhatRewardCoin = await RewardCoin.deploy(
      owner.address, //owner
      owner.address, //treasury where initially minted coins go
      [owner.address, addr1.address], //whitelisted addresses
      rewardPerWallet // 10 RWRD coins will be distributed to the whitelisted addresses
    );
  });

  describe('Deployment', () => {
    it('should assign the total supply of rewardCoins to the treasury (owner) on deployment', async function () {
      const ownerBalance = await hardhatRewardCoin.balanceOf(owner.address);
      expect(await hardhatRewardCoin.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe('Transactions', () => {
    it('should transfer rewardCoins from an address to another one', async () => {
      await hardhatRewardCoin.transfer(addr1.address, 10);

      await hardhatRewardCoin.connect(addr1).transfer(addr2.address, 10);
      expect(await hardhatRewardCoin.balanceOf(addr2.address)).to.equal(10);
      expect(await hardhatRewardCoin.balanceOf(addr1.address)).to.equal(0);
    });

    it('should fail to transfer rewardCoins from an address with an unsufficient balance', async () => {
      await hardhatRewardCoin.transfer(addr1.address, 10);

      await expect(
        hardhatRewardCoin.connect(addr1).transfer(addr2.address, 20)
      ).to.be.revertedWith('ERC20: transfer amount exceeds balance');

      expect(await hardhatRewardCoin.balanceOf(addr1.address)).to.equal(10);
      expect(await hardhatRewardCoin.balanceOf(addr2.address)).to.equal(0);
    });
  });

  describe('Whitelist', () => {
    it('should display the right pending rewards for whitelisted addresses', async () => {
      const ownerReward = await hardhatRewardCoin.rewardOf(owner.address);
      const addr1Reward = await hardhatRewardCoin.rewardOf(addr1.address);

      expect(ownerReward).to.equal(rewardPerWallet);
      expect(addr1Reward).to.equal(rewardPerWallet);
    });

    it('should display 0 rewards for non-whitelisted addresses', async () => {
      const addr2Reward = await hardhatRewardCoin.rewardOf(addr2.address);

      expect(addr2Reward).to.equal(0);
    });

    it('should allow a whitelisted address to claim an amount of reward', async () => {
      const claimedAmount = 1;
      
      await expect(hardhatRewardCoin.connect(addr1).claim(claimedAmount))
        .to.emit(hardhatRewardCoin, 'Claim')
        .withArgs(addr1.address, claimedAmount);

      const addr1Balance = await hardhatRewardCoin.balanceOf(addr1.address);
      const addr1Reward = await hardhatRewardCoin.rewardOf(addr1.address);

      expect(addr1Balance).to.equal(claimedAmount);
      expect(addr1Reward).to.equal(rewardPerWallet - claimedAmount);
    });

    it('should revert if a non whitelisted address tries to claim rewards', async () => {
      const claimedAmount = 1;
      
      await expect(hardhatRewardCoin.connect(addr2).claim(claimedAmount))
        .to.be.revertedWith('Whitelisted address only');
    });
  });

  describe('Management', () => {
    it('should allow the owner to set a new contract owner', async () => {
      // We set addr1 to be the owner of the contract
      await hardhatRewardCoin.setOwner(addr1.address);
      expect(await hardhatRewardCoin.owner()).to.equal(addr1.address);
      
      // Now it should fail because the contract owner has changed
      await expect(hardhatRewardCoin.setOwner(owner.address)).to.be.revertedWith("Owner only");
      
      // But we can set a new contract owner by connecting to addr1
      await hardhatRewardCoin.connect(addr1).setOwner(owner.address);
      expect(await hardhatRewardCoin.owner()).to.equal(owner.address);
    });

    it('should prevent non-owners from changing the owner', async () => {
      // Now it should fail because the contract owner has changed
      await expect(hardhatRewardCoin.connect(addr1).setOwner(addr2.address)).to.be.revertedWith("Owner only");
    });

    it('should allow the owner to add a new wallet to the whitelist', async () => {
      expect(await hardhatRewardCoin.rewardOf(addr2.address)).to.equal(0);

      await hardhatRewardCoin.addToWhitelist(addr2.address);

      expect(await hardhatRewardCoin.rewardOf(addr2.address)).to.equal(rewardPerWallet);
    });

    it('should not allow more than 5 whitelisted address', async () => {
      //There are already 2 whitelisted addresses 
      //from the deployment phase (owner and addr1)

      await hardhatRewardCoin.addToWhitelist(addr2.address);
      await hardhatRewardCoin.addToWhitelist(addr3.address);
      await hardhatRewardCoin.addToWhitelist(addr4.address);
      await expect(hardhatRewardCoin.addToWhitelist(addr5.address)).to.be.revertedWith("Max whitelist size reached");
    });

    it('should not allow adding the same address to the whitelist twice', async () => {
      await hardhatRewardCoin.addToWhitelist(addr2.address);
      await expect(hardhatRewardCoin.addToWhitelist(addr2.address)).to.be.revertedWith("Already in whitelist");
    });

    it('should allow the owner to change the reward (only for newly added to the whitelist)', async () => {
      expect(await hardhatRewardCoin.rewardOf(addr1.address)).to.equal(rewardPerWallet);
      const newRewardPerWallet = rewardPerWallet * 2;
      await hardhatRewardCoin.setRewardPerWallet(newRewardPerWallet);
      
      // Let's add a new address and check if the new reward is displayed
      await hardhatRewardCoin.addToWhitelist(addr2.address);
      expect(await hardhatRewardCoin.rewardOf(addr2.address)).to.equal(newRewardPerWallet);
    });
  });
});
