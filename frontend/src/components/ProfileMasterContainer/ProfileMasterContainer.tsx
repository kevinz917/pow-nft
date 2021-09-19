import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { work } from 'common/wallet/proposal';
import { fetchOwnedNFTs } from 'common/wallet/contractHelpers';
import RenderIf from 'components/RenderIf/RenderIf';
import Spacer from 'components/Spacer/Spacer';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import './profileMasterContainer.scss';

const ProfileMasterContainer = (): JSX.Element => {
  const { active, account, activate, error, connector, library } = useWeb3React<Web3Provider>();

  const [isLoading, setIsLoading] = useState(true);
  const [works, setWork] = useState<work[]>([]);

  useEffect(() => {
    const onMount = async () => {
      try {
        setWork(await fetchOwnedNFTs(account || ''));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    onMount();
  }, [account]);

  return (
    <div className="profile-master-container">
      <RenderIf value={isLoading}>
        <LoadingSpinner />
      </RenderIf>

      <RenderIf value={!isLoading}>
        <div className="header3">Profile</div>
        <Spacer size="large" />

        <div className="body">Address: {account}</div>
        <Spacer size="large" />

        <div className="header4">Achievements</div>
        <Spacer size="medium" />
        <div className="work-container">
          {works.map((work: work) => (
            <div className="body work-block">
              <div className="header3">{work.metadata.name}</div>
              <div>{work.metadata.description}</div>
              <br />
              <div>{work.metadata.date}</div>
              <br />
              <div>NFT ID: {work.tokenId}</div>
            </div>
          ))}
        </div>
      </RenderIf>
    </div>
  );
};

export default ProfileMasterContainer;
