import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import RenderIf from 'components/RenderIf/RenderIf';
import { Link } from 'react-router-dom';
import { injected } from 'wallet/initializeWallet';
import Button from 'components/Button/Button';
import { useEagerConnect } from 'hooks/walletHooks';
import './masterNav.scss';

export const trimWalletAddress = (handle: string): string => {
  return `${handle.slice(0, 6)}...${handle.slice(handle.length - 5, handle.length)}`;
};

const MasterNav = (): JSX.Element => {
  const tried = useEagerConnect();
  const { active, account, activate, error, connector, library } = useWeb3React<Web3Provider>();

  return (
    <div className="master-nav-container">
      <div className="master-nav-left-container">
        <div className="header3" style={{ marginRight: '20px' }}>
          POW-NFT
        </div>
        <Link to="/proposer">
          <div className="master-nav-link">For Contributors</div>
        </Link>

        <Link to="/proposals">
          <div className="master-nav-link">For Reviewers</div>
        </Link>
      </div>
      <div className="master-nav-left-container">
        <Link to="/profile">
          <div className="master-nav-link">Profile</div>
        </Link>

        <RenderIf value={!tried}>
          <div className="master-nav-address-container">Connecting ..</div>
        </RenderIf>

        <RenderIf value={tried}>
          <RenderIf value={active}>
            <div className="master-nav-address-container">{trimWalletAddress(account || '')}</div>
          </RenderIf>

          <RenderIf value={!active}>
            <Button onClick={() => activate(injected)}>Connect to Wallet</Button>
          </RenderIf>
        </RenderIf>
      </div>
    </div>
  );
};

export default MasterNav;
