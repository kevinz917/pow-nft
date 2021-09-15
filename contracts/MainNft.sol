// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

struct WorkProof {
  string tokenURI;
}

contract MainNft is ERC721Enumerable, Ownable {
  mapping(uint256 => WorkProof) public workProofs; // NFT structs containing the tokenURI
  mapping(uint256 => address) public ogOwners; // Is there a way to prevent people from transfering?
  uint256 public tokenId; // nft token ID

  constructor() ERC721("Kevin's Experiment", "KZ") {
    transferOwnership(msg.sender);
  }

  /**
   * @dev mint NFT
   * @param recipient: recipient of the NFT
   * @param metadataURI: storage url containing work info
   */
  function mint(address recipient, string memory metadataURI) external payable onlyOwner {
    workProofs[tokenId].tokenURI = metadataURI;
    ogOwners[tokenId] = recipient;
    _mint(recipient, tokenId);
    tokenId++;
  }

  /**
   * @dev check if owner is OG
   * @param _tokenId: nft token id
   */
  function isOgOwner(uint256 _tokenId) public view returns (bool) {
    require(_tokenId <= tokenId, "Invalid token id");
    return (msg.sender == ogOwners[_tokenId]);
  }

  function transferFrom(
    address from,
    address to,
    uint256 _tokenId
  ) public virtual override onlyOwner {
    super.transferFrom(from, to, _tokenId);
  }

  function tokenURI(uint256 _tokenid) public view override returns (string memory) {
    return workProofs[_tokenid].tokenURI;
  }
}
