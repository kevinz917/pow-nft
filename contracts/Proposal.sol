// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./MainNft.sol";

<<<<<<< HEAD
contract Proposal is Ownable {
    MainNft test = new MainNft();

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

    uint256 private _proposalID = 0; // proposal ID: counter of submitted proposals
    mapping(uint256 => ProposalData) public Proposals; // Proposals: maps proposalID to Proposals
    /**
     * @dev creates a proposal object with the appropriate metadata; called by the proposer
     * @param _proposalDataURI: IPFS address of the .json file containing proposal information
     */
    function createProposal(string memory _proposalDataURI) public virtual {
        Proposals[_proposalID] = ProposalData(
            address(0),
            0,
            _proposalDataURI,
            msg.sender
        );
        _proposalID++;
    }

    /**
     * @dev approves a proposal and mints an NFT to the proposer's address; called by the reviewer
     * @param _proposalID: index of proposal submitted
     */
    function approveProposal(uint256 _proposalID) public virtual onlyOwner {
        Proposals[_proposalID].reviewer = msg.sender;
        test.mint(
            Proposals[_proposalID].contributor,
            Proposals[_proposalID].proposalDataURI
        );

        Proposals[_proposalID].nftID = test._nonce();
    }
=======
contract Proposal is Ownable, MainNft {

  // Create instance of the contract
  // TO-DO: FIGURE OUT HOW ELSE TO DO THIS
  MainNft test = new MainNft();

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

  uint256 public _proposalID = 0; // proposal ID: counter of submitted proposals
  mapping(uint256 => ProposalData) public Proposals; // Proposals: maps proposalID to Proposals

  /**
   * @dev creates a proposal object with the appropriate metadata; called by the proposer
   * @param _proposalDataURI: IPFS address of the .json file containing proposal information
   */
  function createProposal(string memory _proposalDataURI) public virtual {

    ProposalData storage newProposal = ProposalData(address(0), -1, _proposalDataURI, msg.sender);
    Proposals[_proposalID] = newProposal;
    _proposalID++;

    return newProposal;
  }

  /**
   * @dev approves a proposal and mints an NFT to the proposer's address; called by the reviewer
   * @param _proposalID: index of proposal submitted
   */
  function approveProposal(uint256 _proposalID) public virtual onlyOwner {
    
    Proposals[_proposalID].reviewer = msg.sender;
    test.mint(Proposals[_proposalID].contributor, Proposals[_proposalID].proposalDataURI);
    Proposals[_proposalID].nftID = test._nonce();

  }
>>>>>>> temporary fixed for imports
}
