// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Membership.sol";
import "./MainNft.sol";
import "hardhat/console.sol";

/**
 * @dev creates a proposal object
 * @param reviewers: address of the party who reviews the proposal
 * @param nftID: count of the NFTs issued by the DAO (for internal book-keeping)
 * @param proposalDataURI: IPFS address of the .json containing proposal details
 * @param contributor: address of the party who submitted the proposal
 */
struct ProposalData {
  uint256 nftID;
  string proposalDataURI;
  address contributor;
}

contract Proposal is Ownable {
  MainNft public NFT;
  Membership public membership;

  constructor() {
    NFT = new MainNft();
    membership = new Membership();
  }

  uint256 public proposalID = 0; // proposal ID: counter of submitted proposals
  mapping(uint256 => ProposalData) public Proposals; // Proposals: maps proposalID to Proposals
  mapping(uint256 => address[]) public Reviewers;
  mapping(uint256 => mapping(address => bool)) public Approvals; // Approvals: maps proposalID to list of addresses to approval status

  /**
   * @dev creates a proposal object with the appropriate metadata; called by the proposer
   * @param _proposalDataURI: IPFS address of the .json file containing proposal information
   * @param _reviewers: Array of reviewers
   */
  function createProposal(string memory _proposalDataURI, address[] memory _reviewers) public {
    require(_reviewers.length > 0, "At least one reviewer");

    Proposals[proposalID] = ProposalData({ nftID: 0, proposalDataURI: _proposalDataURI, contributor: msg.sender });
    for (uint256 i = 0; i < _reviewers.length; i++) {
      Reviewers[proposalID].push(_reviewers[i]);
    }
    proposalID++;
  }

  /**
   * @dev approves a proposal and mints an NFT to the proposer's address; called by the reviewer
   * @param _proposalID: index of proposal submitted
   */
  function approveProposal(uint256 _proposalID) public virtual {
    require(_proposalID <= proposalID, "Invalid proposal");

    // check whether user is part of the reviewers list;
    for (uint256 i = 0; i < Reviewers[_proposalID].length; i++) {
      if (Reviewers[_proposalID][i] == msg.sender) {
        Approvals[_proposalID][msg.sender] = true;
      }
    }
  }

  /**
   * @dev triggers mint function for NFT if all approvals are done
   * @param _proposalID: index of proposal submitted
   */
  function triggerMint(uint256 _proposalID) public {
    bool allApproved = true;
    for (uint256 i = 0; i < Reviewers[_proposalID].length; i++) {
      address reviewer = Reviewers[_proposalID][i];
      if (!Approvals[_proposalID][reviewer]) {
        allApproved = false;
      }
    }

    if (allApproved) {
      membership.increaseAttribute(Proposals[_proposalID].contributor);
      NFT.mint(Proposals[_proposalID].contributor, Proposals[_proposalID].proposalDataURI);
      Proposals[_proposalID].nftID = NFT.tokenId();
    }
  }
}
