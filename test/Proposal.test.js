const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

const tokenDataUrl = "https://gateway.pinata.cloud/ipfs/QmbndA7GQkjJenJrP2YjPwP9z8uuhVK5DPGftVRVcT2BfQ";
const emptyAddress = "0x0000000000000000000000000000000000000000";

describe("Proposal", function () {
  let proposalContract;
  let nftContract;
  let owner;
  let addr1;
  let addr2;

  it("Initialization", async () => {
    const proposal = await ethers.getContractFactory("Proposal");

    proposalContract = await proposal.deploy();
    nftContract = await ethers.getContractAt("MainNft", await proposalContract.NFT()); // links contract

    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("Create proposal", async () => {
    await proposalContract.createProposal(tokenDataUrl);

    expect(await proposalContract.proposalID()).to.be.equal(1);

    const firstProposalData = await proposalContract.Proposals(0);
    assert.equal(firstProposalData.proposalDataURI, tokenDataUrl);
    assert.equal(firstProposalData.nftID, 0);
    assert.equal(firstProposalData.reviewer, emptyAddress);
    assert.equal(firstProposalData.contributor, owner.address);
  });

  it("Approve proposal", async () => {
    await proposalContract.approveProposal(0);

    const firstProposalData = await proposalContract.Proposals(0);
    assert.equal(firstProposalData.reviewer, owner.address);
    assert.equal(firstProposalData.nftID, 1);

    expect(await proposalContract.NFT()).to.be.equal(nftContract.address);
    expect(await nftContract.tokenId()).to.be.equal(1);
  });

  it("Check NFT", async () => {
    expect(await nftContract.isOgOwner(0)).to.be.equal(true);
  });
});
