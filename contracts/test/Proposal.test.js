const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

const tokenDataUrl = "https://gateway.pinata.cloud/ipfs/QmbndA7GQkjJenJrP2YjPwP9z8uuhVK5DPGftVRVcT2BfQ";
const emptyAddress = "0x0000000000000000000000000000000000000000";

describe("Proposal", () => {
  let proposalContract;
  let nftContract;
  let membershipContract;
  let owner;
  let addr1;
  let addr2;

  before(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    const reviewers = [owner.address, addr1.address, addr2.address];

    const proposal = await ethers.getContractFactory("Proposal");
    // proposalContract = await proposal.deploy([reviewers, reviewers], [tokenDataUrl, tokenDataUrl]);
    proposalContract = await proposal.deploy();
    nftContract = await ethers.getContractAt("MainNft", await proposalContract.NFT()); // fetches contract initiated within the proposal contract
    membershipContract = await ethers.getContractAt("Membership", await proposalContract.membership());
  });

  it("Create proposal", async () => {
    const reviewers = [owner.address, addr1.address, addr2.address];
    await proposalContract.createProposal(tokenDataUrl, reviewers);

    expect(await proposalContract.proposalID()).to.be.equal(1);
    const firstProposalData = await proposalContract.Proposals(0);

    const res = await proposalContract.Reviewers(0, 0);
    expect(res, owner.address);

    assert.equal(firstProposalData.proposalDataURI, tokenDataUrl);
    assert.equal(firstProposalData.nftID, 0);
    assert.equal(firstProposalData.contributor, owner.address);
  });

  it("Approve proposal from one party", async () => {
    await proposalContract.approveProposal(0);

    let approvedState = await proposalContract.Approvals(0, owner.address);
    assert.equal(approvedState, true);
  });

  it("Approve all + Mint NFT", async () => {
    const reviewers = [owner.address, addr1.address, addr2.address];

    await proposalContract.approveProposal(0);
    await proposalContract.connect(addr1).approveProposal(0);
    await proposalContract.connect(addr2).approveProposal(0);

    await proposalContract.triggerMint(0);

    const character = await membershipContract.characters(owner.address);
    assert.equal(character.swag > 0 || character.strength > 0 || character.speed > 0, true);
  });
});
