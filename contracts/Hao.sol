// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Hao is ERC20 {
     constructor(uint256 initialSupply) ERC20("Hao", "HAO") {
        _mint(msg.sender, initialSupply);
    }
}
