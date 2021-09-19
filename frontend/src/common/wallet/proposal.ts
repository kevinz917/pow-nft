import axios from 'axios';
import { proposal } from 'components/ReviewerMasterPage/ReviewerMasterPage';

export interface work {
  tokenId: number;
  metadata: metadata;
}
export interface metadata {
  name: string;
  date: string;
  description: string;
}

export const resolveIPFSData = async (ipfsLink: string): Promise<any> => {
  try {
    const res = await axios.get(ipfsLink);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const isProposalApproved = (proposal: proposal): boolean => {
  if (proposal.nftID > 0) return true;
  return false;
};

export const filterApprovedProposals = (proposals: proposal[], approved: boolean): proposal[] => {
  return proposals.filter((proposal: proposal) => isProposalApproved(proposal) === approved);
};
