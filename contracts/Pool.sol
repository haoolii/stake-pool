// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./Hao.sol";

contract Pool {
    string public name = "Hao Stake Pool";

    address public owner;

    Hao public hao;

    uint public totalStaked;

    uint public rewardRate;

    uint public lastUpdateTime;

    uint public rewardPerTokenStored;

    mapping(address => uint) public stakeBalance;

    mapping(address => uint) public userRewardPerTokenPaid;

    mapping(address => uint) public rewards;

    constructor(Hao _hao) {
        hao = _hao;

        owner = msg.sender;

        rewardRate = 1e16;

        lastUpdateTime = block.timestamp;
    }

    function rewardPerToken() public view returns (uint) {
        if (totalStaked == 0) {
            return 0;
        }
        return
            rewardPerTokenStored +
            (((block.timestamp - lastUpdateTime) * rewardRate) /
                (totalStaked / 1e18)); 
    }

    function earned(address account) public view returns (uint) {
        if (totalStaked == 0) {
            return rewards[account];
        }
        return
            ((stakeBalance[account] * (rewardPerToken() - userRewardPerTokenPaid[account])) / 1e18) + rewards[account];
    }

    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;

        rewards[account] = earned(account);
        userRewardPerTokenPaid[account] = rewardPerTokenStored;
        _;
    }

    function stake(uint _value) public updateReward(msg.sender) {
        hao.transferFrom(msg.sender, address(this), _value);

        totalStaked += _value;

        stakeBalance[msg.sender] += _value;
    }

    function unstake(uint amount) public updateReward(msg.sender) {
        uint balance = stakeBalance[msg.sender];

        require(balance > 0, "Staking balance cannot be less than zero");

        totalStaked -= amount;

        stakeBalance[msg.sender] -= amount;

        hao.transfer(msg.sender, amount);
    }

    function getReward() public updateReward(msg.sender) {
        uint reward = rewards[msg.sender];
        rewards[msg.sender] = 0;
        hao.transfer(msg.sender, reward);
    }
}
