// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./MainNft.sol";

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 83682cb4c26d8c829e246a426718397f29a582e7
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
<<<<<<< HEAD
=======
contract Proposal is Ownable {
  MainNft public NFT;

  constructor() {
    NFT = new MainNft();
  }

  /**
   * @dev creates a proposal object
   * @param reviewer: address of the party who reviews the proposal
>>>>>>> 7e876662d273661be309c0d0394999f5563f4c60
=======
>>>>>>> 83682cb4c26d8c829e246a426718397f29a582e7
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

<<<<<<< HEAD
<<<<<<< HEAD
  uint256 public _proposalID = 0; // proposal ID: counter of submitted proposals
=======
  uint256 public proposalID = 0; // proposal ID: counter of submitted proposals
>>>>>>> 7e876662d273661be309c0d0394999f5563f4c60
=======
  uint256 public _proposalID = 0; // proposal ID: counter of submitted proposals
>>>>>>> 83682cb4c26d8c829e246a426718397f29a582e7
  mapping(uint256 => ProposalData) public Proposals; // Proposals: maps proposalID to Proposals

  /**
   * @dev creates a proposal object with the appropriate metadata; called by the proposer
   * @param _proposalDataURI: IPFS address of the .json file containing proposal information
   */
  function createProposal(string memory _proposalDataURI) public virtual {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 83682cb4c26d8c829e246a426718397f29a582e7

    ProposalData storage newProposal = ProposalData(address(0), -1, _proposalDataURI, msg.sender);
    Proposals[_proposalID] = newProposal;
    _proposalID++;

    return newProposal;
<<<<<<< HEAD
=======
    Proposals[proposalID] = ProposalData(address(0), 0, _proposalDataURI, msg.sender);
    proposalID++;
>>>>>>> 7e876662d273661be309c0d0394999f5563f4c60
=======
>>>>>>> 83682cb4c26d8c829e246a426718397f29a582e7
  }

  /**
   * @dev approves a proposal and mints an NFT to the proposer's address; called by the reviewer
   * @param _proposalID: index of proposal submitted
   */
  function approveProposal(uint256 _proposalID) public virtual onlyOwner {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 83682cb4c26d8c829e246a426718397f29a582e7
    
    Proposals[_proposalID].reviewer = msg.sender;
    test.mint(Proposals[_proposalID].contributor, Proposals[_proposalID].proposalDataURI);
    Proposals[_proposalID].nftID = test._nonce();

  }
>>>>>>> temporary fixed for imports
<<<<<<< HEAD
=======
    require(_proposalID <= proposalID, "Invalid proposal");

    Proposals[_proposalID].reviewer = msg.sender;
    NFT.mint(Proposals[_proposalID].contributor, Proposals[_proposalID].proposalDataURI);

    Proposals[_proposalID].nftID = NFT.tokenId();
  }
>>>>>>> 7e876662d273661be309c0d0394999f5563f4c60
=======
>>>>>>> 83682cb4c26d8c829e246a426718397f29a582e7
}
