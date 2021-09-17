import { ethers } from 'ethers';
import ProposalAbi from 'abi/Proposal.json';

const proposalContractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';

export const ProposalContract = async (): Promise<any> => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    const proposalContract = new ethers.Contract(proposalContractAddress, ProposalAbi.abi, await provider.getSigner());

    return proposalContract;
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
