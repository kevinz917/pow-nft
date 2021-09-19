import { useEffect, useState } from 'react';
import RenderIf from 'components/RenderIf/RenderIf';
import Chevron from 'assets/svg/Chevron';
import Spacer from 'components/Spacer/Spacer';
import Button from 'components/Button/Button';
import { approveProposal } from 'wallet/contractHelpers';
import { trimWalletAddress } from 'components/MasterNav/MasterNav';
import { isProposalApproved, resolveIPFSData } from 'wallet/proposal';
import { proposal } from 'components/ReviewerMasterPage/ReviewerMasterPage';

interface ownProps {
  idx: number;
  proposal: proposal;
}

const approve = async (proposalId: number) => {
  try {
    await approveProposal(proposalId);
  } catch (err) {
    console.log(err);
  }
};

const ProposalContainer = (props: ownProps): JSX.Element => {
  const { proposal, idx } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [workData, setWorkdata] = useState('');

  useEffect(() => {
    const onMount = async () => {
      if (proposal.proposalDataURI.length > 0) {
        const res = await resolveIPFSData(proposal.proposalDataURI);
        console.log(res);
        setWorkdata(res);
      }
    };

    onMount();
  }, [proposal.proposalDataURI]);

  useEffect(() => {
    if (idx === 0 && !isProposalApproved(proposal)) {
      setIsOpen(true);
    }
  }, [idx]);

  return (
    <div className="proposal-container">
      <div className="proposal-top-container">
        <div className="left-container">
          <div className="id-container">#{idx}</div>
          <div>From: {trimWalletAddress(proposal.contributor)}</div>
        </div>
        <div>
          <RenderIf value={isOpen}>
            <div onClick={() => setIsOpen(!isOpen)} className="flipped pointer">
              <Chevron />
            </div>
          </RenderIf>

          <RenderIf value={!isOpen}>
            <div onClick={() => setIsOpen(!isOpen)} className="pointer">
              <Chevron />
            </div>
          </RenderIf>
        </div>
      </div>

      <RenderIf value={isOpen}>
        <Spacer size="xlarge" />
        <hr />
        <Spacer size="xlarge" />

        <div className="header3">Metadata</div>
        <div>
          <pre>{JSON.stringify(workData, null, 2)}</pre>
        </div>

        <Spacer size="xlarge" />
        <RenderIf value={!isProposalApproved(proposal)}>
          <Button
            onClick={async () => {
              await approve(idx);
            }}
          >
            Approve
          </Button>
        </RenderIf>
      </RenderIf>
    </div>
  );
};

export default ProposalContainer;
