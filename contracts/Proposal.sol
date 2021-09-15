pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./MainNft.sol";


/* @dev Proposal 
 * 
 */
struct Proposal {
  address reviewer;
  uint256 nftID;
  string proposalDataUrl;
  address contributor;
}

contract Proposal is Ownable {
  mapping(uint256 => Proposal) public Proposals; // Mapping proposal id to proposal
  uint256 private _proposalID = 0; // proposal ID

  //Work
  function createProposal(string memory proposalDataUrl) public virtual override {
    Proposal newProposal = Proposal({reviewer:address(0), nftID:-1, proposalDataUrl:proposalDataUrl, contributor: msg.sender});
    Proposals[_proposalID] = newProposal;
    _proposalID++;

    return newProposal;
  }

  function approveProposal(
    uint256 _proposalID
  ) public virtual override onlyOwner {
    Proposals[_proposalID].reviewer = msg.sender;

    MainNft.mint(Proposals[_proposalID].contributor, Proposals[_proposalID].proposalDataUrl);

    Proposals[_proposalID].nftID = MainNft._nonce;

  }
}
