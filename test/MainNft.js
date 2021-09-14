const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

const firstNftTokenURL = "https://gateway.pinata.cloud/ipfs/QmbndA7GQkjJenJrP2YjPwP9z8uuhVK5DPGftVRVcT2BfQ";
const secondNftTokenURL = "https://gateway.pinata.cloud/ipfs/QmbndA7GQkjJenJrP2YjPwP9z8uuhVK5DPGftVRVcT2BfQ";

describe("NFT Contract", function () {
  let nftContract;
  let owner;
  let addr1;
  let addr2;

  it("Contract Initialization", async () => {
    const MainNFT = await ethers.getContractFactory("MainNft");
    nftContract = await MainNFT.deploy();
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("Mint first NFT", async () => {
    await nftContract.mint(owner.address, firstNftTokenURL);

    let count = await nftContract.balanceOf(owner.address);
    let ogOwner = await nftContract.ogOwners(0);

    assert.equal(count.toNumber(), 1);
    assert.equal(ogOwner, owner.address);
  });

  it("Retrieve NFT metadata", async () => {
    let firstNFTMetadata = await nftContract.tokenURI(0);
    assert.equal(firstNftTokenURL, firstNFTMetadata);
  });

  it("Ban Transfer ownership from owner", async () => {
    await nftContract.mint(addr2.address, secondNftTokenURL); // mint NFT for second user
    let count = await nftContract.balanceOf(addr2.address);

    assert.equal(count.toNumber(), 1);
    await expect(nftContract.connect(addr2).transferFrom(addr2.address, addr1.address, 1)).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
