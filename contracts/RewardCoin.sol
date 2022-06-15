// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title RewardCoin
 * @dev A simple ERC20 Token example yields 1000000 tokens pre-assigned to the treasury, 
 * and allows claiming rewards for whitelisted addresses.
 */
contract RewardCoin is ERC20 {
    string public constant NAME = "RewardCoin";
    string public constant SYMBOL = "RWRD";
    uint8 public constant DECIMALS = 0; // No decimals for simplicity
    uint256 public constant INITIAL_SUPPLY = 1000000 * (10**uint256(DECIMALS)); // 1000000 tokens

    address public owner;

    address[] public whitelist;
    uint256 MAX_WHITELIST = 5;

    uint256 public rewardPerWallet;
    mapping(address => uint256) public rewardsLeft;

    event Claim(address indexed wallet, uint256 amount);

    /**
     * @dev Constructor that stores the whitelisted addresses,
     * the initial config and initializes the reward.
     */
    constructor(address _owner, address _treasuryAddress, address[] memory _whitelist, uint256 _rewardPerWallet) ERC20(NAME, SYMBOL) {
        require(_whitelist.length <= MAX_WHITELIST, "Max whitelist size exceeded");
        owner = _owner;
        whitelist = _whitelist;
        rewardPerWallet = _rewardPerWallet;
        _mint(_treasuryAddress, INITIAL_SUPPLY);

        for (uint256 index = 0; index < _whitelist.length; index++) {
            rewardsLeft[whitelist[index]] = rewardPerWallet;
        }
    }

    function decimals() public pure override returns (uint8) {
        return DECIMALS;
    }


    /**
    * @dev Calculate the remaining reward amount for a given wallet.
    */
    function rewardOf(address wallet) public view returns (uint256) {
        return rewardsLeft[wallet];
    }

    /**
    * @dev Claim a user chosen amount from the alloted reward.
    */
    function claim(uint256 amount) public onlyWhitelist {
        require(amount <= rewardsLeft[msg.sender], "Amount too high");
        _mint(msg.sender, amount);
        rewardsLeft[msg.sender] -= amount;
        emit Claim(msg.sender, amount);
    }


    /**
    * @dev Update the owner of the contract
    */
    function setOwner(address _owner) public onlyOwner {
        owner = _owner;
    }

    /**
    * @dev Update the reward per wallet. The new value will only apply to
    * newly whitelisted addresses.
    */
    function setRewardPerWallet(uint256 _rewardPerWallet) public onlyOwner {
        rewardPerWallet = _rewardPerWallet;
    }

    function addToWhitelist(address whitelistedAddress) public onlyOwner {
        require(whitelist.length < MAX_WHITELIST, "Max whitelist size reached");
        require(!isWhitelisted(whitelist, whitelistedAddress), "Already in whitelist");

        whitelist.push(whitelistedAddress);
        rewardsLeft[whitelistedAddress] = rewardPerWallet;
    }

    modifier onlyWhitelist {
        require(isWhitelisted(whitelist, msg.sender), "Whitelisted address only");
        _;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Owner only");
        _;
    }
}

function isWhitelisted(address[] memory whitelist, address wallet) pure returns (bool) {
    bool found = false;
    for (uint256 index = 0; index < whitelist.length; index++) {
        if (whitelist[index] == wallet) {
            found = true;
            break;
        }
    }

    return found;
}