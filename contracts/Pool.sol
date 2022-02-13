// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./Hao.sol";

contract Pool {
    string public name = "Hao Stake Pool";

    address public owner;

    Hao public hao;

    uint256 public totalStaked;

    uint256 public dailyReward;

    /** all stake users stake balance */
    mapping(address => uint256) public stakeBalance;

    constructor(Hao _hao) {
        hao = _hao;

        owner = msg.sender;

        dailyReward = 0;
    }

    /**
     * Set Daily Reward
     */
    function setDailyReward(uint256 reward) public {
        require(msg.sender == owner, "caller must be the owner");

        require(reward > 0, 'Reward cannot be less than zero');

        dailyReward = reward;
    }

    /**
     * Stake Token
     */
    function stake(uint256 _value) public {
        hao.transferFrom(msg.sender, address(this), _value);

        stakeBalance[msg.sender] += _value;

        totalStaked += _value;
    }

    /**
     * Unstake Token
     */
    function unstake() public {
        uint256 balance = stakeBalance[msg.sender];

        require(balance > 0, 'Staking balance cannot be less than zero');

        hao.transfer(msg.sender, balance);

        stakeBalance[msg.sender] = 0;

        totalStaked -= balance;
    }
}