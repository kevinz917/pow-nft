pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./MainNft.sol";

contract Proposal is Ownable {

  /** 
   * @dev Creates a proposal object with
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

  uint256 private proposalID = 0; // proposal ID: counter of submitted proposals
  mapping(uint256 => ProposalData) public Proposals; // Proposals: maps proposalID to Proposals

  /**
   * @dev creates a proposal object with the appropriate metadata; called by the proposer
   * @param _proposalDataURI: IPFS address of the .json file containing proposal information
   */
  function createProposal(string memory _proposalDataURI) public virtual override {

    ProposalData newProposal = ProposalData(address(0), -1, _proposalDataURI, msg.sender);
    Proposals[_proposalID] = newProposal;
    _proposalID++;

    return newProposal;
  }

  /**
   * @dev approves a proposal and mints an NFT to the proposer's address; called by the reviewer
   * @param _proposalID: index of proposal submitted
   */
  function approveProposal(uint256 _proposalID) public virtual override onlyOwner {
    
    Proposals[_proposalID].reviewer = msg.sender;
    MainNft.mint(Proposals[_proposalID].contributor, Proposals[_proposalID].proposalDataUrl);
    Proposals[_proposalID].nftID = MainNft._nonce;

  }
}
