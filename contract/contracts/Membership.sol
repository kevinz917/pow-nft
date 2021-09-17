// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

struct Character {
  uint8 eng;
  uint8 design;
  uint8 marketing;
  uint8 community;
}

contract Membership {
  mapping(address => Character) characters;

  constructor() {}

  function _randomishIntLessThan(bytes32 salt, uint8 n) private view returns (uint8) {
    if (n == 0) return 0;
    return uint8(keccak256(abi.encodePacked(block.timestamp, msg.sender, salt))[0]) % n;
  }
}
