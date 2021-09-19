import React, { useEffect, useState } from 'react';
import Spacer from 'components/Spacer/Spacer';
import RenderIf from 'components/RenderIf/RenderIf';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import { fetchAllProposals } from 'wallet/contractHelpers';
import { filterApprovedProposals } from 'wallet/proposal';
import ProposalContainer from 'components/ProposalContainer/ProposalContainer';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import './reviewMasterPage.scss';

export interface proposal {
  contributor: string;
  nftID: number;
  proposalDataURI: string;
}

const ReviewerMasterPage = (): JSX.Element => {
  const [allProposals, setAllProposals] = useState<proposal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAndSetProposals();
  }, []);

  const fetchAndSetProposals = async () => {
    try {
      const allProposals = await fetchAllProposals();
      setAllProposals(allProposals);
      console.log(allProposals);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="all-proposals-container">
        <RenderIf value={!isLoading}>
          <div className="fade-in">
            <div className="header3">Unapproved</div>
            <Spacer size="medium" />
            {filterApprovedProposals(allProposals, false).map((proposal: proposal, idx: number) => (
              <ProposalContainer proposal={proposal} idx={idx} key={`${idx} ${proposal.proposalDataURI}`} />
            ))}

            <Spacer size="xlarge" />
            <div className="header3">Approved</div>
            <Spacer size="medium" />
            {filterApprovedProposals(allProposals, true).map((proposal: proposal, idx: number) => (
              <ProposalContainer proposal={proposal} idx={idx} key={`${idx} ${proposal.proposalDataURI}`} />
            ))}
          </div>
        </RenderIf>

        <RenderIf value={isLoading}>
          <LoadingSpinner />
        </RenderIf>
      </div>
    </React.Fragment>
  );
};

export default ReviewerMasterPage;
