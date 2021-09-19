// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

struct Character {
  uint8 swag;
  uint8 strength;
  uint8 speed;
}

contract Membership is Ownable {
  mapping(address => Character) public characters;

  constructor() {
    transferOwnership(msg.sender);
  }

  /**
   * @dev increase random attribute
   * @param recipient: recipient
   */
  function increaseAttribute(address recipient) public onlyOwner {
    uint8 attributeId = _randomishIntLessThanEqualTo("nft", 4);
    uint8 number = _randomishIntLessThanEqualTo("nft", 5);

    if (attributeId == 0) {
      characters[recipient].swag += number;
    } else if (attributeId == 1) {
      characters[recipient].strength += number;
    } else {
      characters[recipient].speed += number;
    }
  }

  /**
   * @dev generate random integer less than or equal to n
   * @param salt: salt
   * @param n: max number
   */
  function _randomishIntLessThanEqualTo(bytes32 salt, uint8 n) private view returns (uint8) {
    if (n == 0) return 1;
    return (uint8(keccak256(abi.encodePacked(block.timestamp, msg.sender, salt))[0]) % n) + 1;
  }
}
