import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import React, { useState } from 'react';
import { pinFileToIPFS, formSchema, formatFullIpfsUrl } from './helper';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Spacer from 'components/Spacer/Spacer';
import RenderIf from 'components/RenderIf/RenderIf';
import { createProposal } from 'wallet/contractHelpers';
import './proposerMasterPage.scss';

const ProposerMasterPage = (): JSX.Element => {
  const { active, account, activate, error, connector, library } = useWeb3React<Web3Provider>();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [ipfsUrl, setIpfsUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadState, setUploadState] = useState<number>(0);
  const [showError, setShowError] = useState(false);

  const uploadFile = async () => {
    try {
      setIsUploading(true);
      setShowError(true);
      if (areAllFieldsValid()) {
        const res: string = await pinFileToIPFS(name, description);
        setIpfsUrl(res);
        setUploadState(1);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsUploading(false);
    }
  };

  const showNameErrors = !formSchema.fields.Name.isValidSync(name) && showError;
  const showDescritionError = !formSchema.fields.Description.isValidSync(description) && showError;

  const areAllFieldsValid = (): boolean => {
    return formSchema.fields.Name.isValidSync(name) && formSchema.fields.Description.isValidSync(description);
  };

  return (
    <React.Fragment>
      <RenderIf value={!active}>
        <Spacer size="xlarge" />
        <div className="loading-spinner-container">Please connect wallet</div>
      </RenderIf>

      <RenderIf value={active}>
        <div className="proposer-dashboard-container">
          <div className="header3">Create a Proposal</div>
          <Spacer size="xlarge" />

          <div className="proposer-dashboard-input-row-container">
            <div className={`proposer-name-column ${showNameErrors && 'warning'}`}>Name</div>
            <div className="proposer-dashboard-input-container">
              <Input value={name} onChange={(e: any) => setName(e.target.value)} />
            </div>
          </div>

          <div className="proposer-dashboard-input-row-container">
            <div className={`proposer-name-column ${showDescritionError && 'warning'}`}>Description</div>
            <div className="proposer-dashboard-input-container">
              <Input value={description} onChange={(e: any) => setDescription(e.target.value)} />
            </div>
          </div>

          <Spacer size="small" />

          <RenderIf value={uploadState === 0}>
            <Button onClick={async () => await uploadFile()} disabled={isUploading}>
              Upload to IPFS
            </Button>
          </RenderIf>

          <RenderIf value={uploadState === 1}>
            <Button
              onClick={async () => {
                await createProposal(formatFullIpfsUrl(ipfsUrl));
              }}
              disabled={isUploading}
            >
              Create Approval
            </Button>
          </RenderIf>
        </div>
      </RenderIf>
    </React.Fragment>
  );
};

export default ProposerMasterPage;
