const { ethers } = require('hardhat');

async function main() {
  const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();

  const RewardCoin = await ethers.getContractFactory('RewardCoin');
  const rewardCoin = await RewardCoin.deploy(addr1.address, addr1.address, [owner.address, addr1.address, addr2.address, addr3.address, addr4.address], 10);

  console.log('RewardCoin deployed to:', rewardCoin.address);
  console.log('Owner:', addr1.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
