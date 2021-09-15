pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

struct WorkProof {
  string tokenURI;
}

// TODO
// Add voting system for minting work NFTs / a review system requiring multisig

contract MainNft is ERC721Enumerable, Ownable {
  mapping(uint256 => WorkProof) public workProofs; // NFT structs containing the tokenURI
  mapping(uint256 => address) public ogOwners; // Is there a way to prevent people from transfering?
  uint256 public _nonce; // token ID

  constructor() ERC721("Kevin's Experiment", "KZ") {
    transferOwnership(msg.sender);
  }

  function mint(address recipient, string memory metadataURI) external payable {
    // Ban self minting from admin
    if (recipient == owner()) {
      require(msg.sender != owner());
    }
    workProofs[_nonce].tokenURI = metadataURI;
    ogOwners[_nonce] = recipient;
    _mint(recipient, _nonce);
    _nonce++;
  }

  // We only allow admin to transfer the ownership of NFTs because
  // work proofs aren't meant to be tradable!
  function transferFrom(
    address from,
    address to,
    uint256 tokenId
  ) public virtual override onlyOwner {
    super.transferFrom(from, to, tokenId);
  }

  function isOgOwner(uint256 tokenId) public view returns (bool) {
    return (msg.sender == ogOwners[tokenId]);
  }

  function tokenURI(uint256 _tokenid) public view override returns (string memory) {
    return workProofs[_tokenid].tokenURI;
  }

  // function _randomishIntLessThan(bytes32 salt, uint8 n) private view returns (uint8) {
  //   if (n == 0) return 0;
  //   return uint8(keccak256(abi.encodePacked(block.timestamp, _nonce, msg.sender, salt))[0]) % n;
  // }
}
