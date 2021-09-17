const hre = require("hardhat");

const tokenDataUrl = "https://gateway.pinata.cloud/ipfs/QmbndA7GQkjJenJrP2YjPwP9z8uuhVK5DPGftVRVcT2BfQ";

// deploy command: npx hardhat run --network localhost scripts/deploy.js

const main = async () => {
  const proposal = await ethers.getContractFactory("Proposal");
  proposalContract = await proposal.deploy([tokenDataUrl, tokenDataUrl]);

  nftContract = await ethers.getContractAt("MainNft", await proposalContract.NFT()); // fetches contract initiated within the proposal contract

  console.log("Proposal Contract Address", nftContract.address);
  console.log("NFT Contract Address", proposalContract.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
