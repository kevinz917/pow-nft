// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Membership.sol";
import "./MainNft.sol";

contract Proposal is Ownable {
  Membership public membership;
  MainNft public NFT;

  /**
   * @dev initialize contract with list of proposals
   * @param _proposalDataURIs: list of data URLs
   */
  constructor(string[] memory _proposalDataURIs) {
    NFT = new MainNft();
    membership = new Membership();

    for (uint8 i = 0; i < _proposalDataURIs.length; i++) {
      createProposal(_proposalDataURIs[i]);
    }
  }

  /**
   * @dev creates a proposal object
   * @param reviewer: address of the party who reviews the proposal
   * @param nftID: count of the NFTs issued by the DAO (for internal book-keeping)
   * @param proposalDataURI: IPFS address of the .json containing proposal details
   * @param contributor: address of the party who submitted the proposal
   */
  struct ProposalData {
    address reviewer;
    uint256 nftID;
    string proposalDataURI;
    address contributor;
  }

  uint256 public proposalID = 0; // proposal ID: counter of submitted proposals
  mapping(uint256 => ProposalData) public Proposals; // Proposals: maps proposalID to Proposals

  /**
   * @dev creates a proposal object with the appropriate metadata; called by the proposer
   * @param _proposalDataURI: IPFS address of the .json file containing proposal information
   */
  function createProposal(string memory _proposalDataURI) public virtual {
    Proposals[proposalID] = ProposalData(address(0), 0, _proposalDataURI, msg.sender);
    proposalID++;
  }

  /**
   * @dev approves a proposal and mints an NFT to the proposer's address; called by the reviewer
   * @param _proposalID: index of proposal submitted
   */
  function approveProposal(uint256 _proposalID) public virtual onlyOwner {
    require(_proposalID <= proposalID, "Invalid proposal");

    Proposals[_proposalID].reviewer = msg.sender;
    NFT.mint(Proposals[_proposalID].contributor, Proposals[_proposalID].proposalDataURI);

    Proposals[_proposalID].nftID = NFT.tokenId();
  }
}
