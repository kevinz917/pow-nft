const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

const tokenDataUrl = "https://gateway.pinata.cloud/ipfs/QmbndA7GQkjJenJrP2YjPwP9z8uuhVK5DPGftVRVcT2BfQ";
const emptyAddress = "0x0000000000000000000000000000000000000000";

describe("Proposal", () => {
  let proposalContract;
  let nftContract;
  let owner;
  let addr1;
  let addr2;

  before(async () => {
    const proposal = await ethers.getContractFactory("Proposal");
    proposalContract = await proposal.deploy();
    nftContract = await ethers.getContractAt("MainNft", await proposalContract.NFT()); // fetches contract initiated within the proposal contract
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("Create proposal", async () => {
    const reviewers = [owner.address, addr1.address, addr2.address];
    await proposalContract.createProposal(tokenDataUrl, reviewers);

    expect(await proposalContract.proposalID()).to.be.equal(1);

    const firstProposalData = await proposalContract.Proposals(0);
    assert.equal(firstProposalData.proposalDataURI, tokenDataUrl);
    assert.equal(firstProposalData.nftID, 0);
    assert.equal(firstProposalData.reviewers, [owner.address, addr1.address, addr2.address]);
    assert.equal(firstProposalData.contributor, owner.address);
  });

  it("Approve proposal", async () => {
    //Define reviewers before we can approve proposal
    const reviewers = [owner.address, addr1.address, addr2.address];
    await proposalContract.createProposal(tokenDataUrl, reviewers);


    await proposalContract.approveProposal(0);

    const approvals = await proposalContract.Approvals(0);
    const firstProposalData = await proposalContract.Proposals(0);
    assert.equal(firstProposalData.reviewers, [owner.address, addr1.address, addr2.address]);
    assert.equal(approvals[0], true);
    assert.equal(firstProposalData.nftID, 1);

    expect(await proposalContract.NFT()).to.be.equal(nftContract.address);
    expect(await nftContract.tokenId()).to.be.equal(1);
  });

  it("Check NFT", async () => {
    expect(await nftContract.isOgOwner(0)).to.be.equal(true);
  });
});
