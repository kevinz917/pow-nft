// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./MainNft.sol";

contract Proposal is Ownable {
  MainNft public NFT;

  constructor() {
    NFT = new MainNft();
  }

  /**
   * @dev creates a proposal object
   * @param reviewer: address of the party who reviews the proposal
   * @param nftID: count of the NFTs issued by the DAO (for internal book-keeping)
   * @param proposalDataURI: IPFS address of the .json containing proposal details
   * @param contributor: address of the party who submitted the proposal
   */
  struct ProposalData {
    address[] reviewers;
    uint256 nftID;
    string proposalDataURI;
    address contributor;
  }

  uint256 public proposalID = 0; // proposal ID: counter of submitted proposals
  mapping(uint256 => ProposalData) public Proposals; // Proposals: maps proposalID to Proposals
  mapping(uint256 => mapping(address => bool)) public Approvals; // Approvals: maps proposalID to list of addresses to approval status

  /**
   * @dev creates a proposal object with the appropriate metadata; called by the proposer
   * @param _proposalDataURI: IPFS address of the .json file containing proposal information
   */
  function createProposal(string memory _proposalDataURI, address[] memory reviewers) public virtual {
    Proposals[proposalID] = ProposalData(reviewers, 0, _proposalDataURI, msg.sender);
    proposalID++;
  }

  /**
   * @dev approves a proposal and mints an NFT to the proposer's address; called by the reviewer
   * @param _proposalID: index of proposal submitted
   */
  function approveProposal(uint256 _proposalID) public virtual onlyOwner {
    require(_proposalID <= proposalID, "Invalid proposal");

    for(uint i=0; i < 3; i++){
      if (Proposals[_proposalID].reviewers[i] == msg.sender){
        Approvals[_proposalID][msg.sender] == true;
      }
    }

    bool allApproved = true;
    for(uint i=0; i < 3; i++){
      address reviewer = Proposals[_proposalID].reviewers[i];
      if (!Approvals[_proposalID][reviewer]){
        allApproved = false;
      }
    }

    if(allApproved){
      NFT.mint(Proposals[_proposalID].contributor, Proposals[_proposalID].proposalDataURI);
      Proposals[_proposalID].nftID = NFT.tokenId();
    }
  }
}
