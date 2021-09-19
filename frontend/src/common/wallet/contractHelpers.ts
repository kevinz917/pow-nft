import { ethers } from 'ethers';
import { resolveIPFSData } from 'common/wallet/proposal';
import ProposalAbi from 'abi/Proposal.json';
import NftAbi from 'abi/MainNft.json';

const proposalContractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
const nftContractAddress = '0xa16E02E87b7454126E5E10d957A927A7F5B5d2be';

export const ProposalContract = async (): Promise<any> => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    const proposalContract = new ethers.Contract(proposalContractAddress, ProposalAbi.abi, await provider.getSigner());
    return proposalContract;
  } catch (err) {
    console.log(err);
  }
};

export const NftContract = async (): Promise<any> => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    const nftContract = new ethers.Contract(nftContractAddress, NftAbi.abi, await provider.getSigner());
    return nftContract;
  } catch (err) {
    console.log(err);
  }
};

export const fetchProposalCount = async (): Promise<number | void> => {
  try {
    const Proposal = await ProposalContract();
    const proposalCount = await Proposal.proposalID();
    return proposalCount.toNumber();
  } catch (err) {
    console.log(err);
  }
};

export const fetchAllProposals = async (): Promise<any> => {
  try {
    const Proposal = await ProposalContract();
    const proposalCount = await fetchProposalCount();

    const allProposals = [];

    for (let i = 0; i < proposalCount; i++) {
      const fetchedProposal = await Proposal.Proposals(i);
      allProposals.push(fetchedProposal);
    }

    return allProposals;
  } catch (err) {
    console.log(err);
  }
};

export const approveProposal = async (proposalId: number): Promise<any> => {
  try {
    const Proposal = await ProposalContract();
    await Proposal.approveProposal(proposalId);
  } catch (err) {
    console.log(err);
  }
};

export const createProposal = async (dataURL: string): Promise<any> => {
  try {
    const Proposal = await ProposalContract();
    await Proposal.createProposal(dataURL);
  } catch (err) {
    console.log(err);
  }
};

export const fetchNftCount = async (): Promise<any> => {
  try {
    let NFT: any = await NftContract();

    let count = await NFT.tokenId();
    let owner = await NFT.ownerOf(0);

    return count.toNumber();
  } catch (err) {
    console.log(err);
  }
};

export const fetchNFTMetadataByIds = async (ids: number[]): Promise<any> => {
  try {
    const NFT: any = await NftContract();
    const allData = [];

    for (let i = 0; i < ids.length; i++) {
      const tokenId = ids[i];
      const tokenURI = await NFT.tokenURI(tokenId);
      let metadata = await resolveIPFSData(tokenURI);
      allData.push({
        tokenId: tokenId,
        metadata,
      });
    }
    return allData;
  } catch (err) {
    console.log(err);
  }
};

export const fetchOwnedNFTs = async (address: string): Promise<any> => {
  try {
    const NFT: any = await NftContract();
    const count = await NFT.tokenId();

    let ownedNFTIds = [];
    for (let i = 0; i < count; i++) {
      if ((await NFT.ownerOf(i)) === address) {
        ownedNFTIds.push(i);
      }
    }
    let allData = await fetchNFTMetadataByIds(ownedNFTIds);
    console.log(allData);
    return allData;
  } catch (err) {
    console.log(err);
  }
};
