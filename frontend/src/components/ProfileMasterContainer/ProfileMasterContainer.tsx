import Spacer from 'components/Spacer/Spacer';
import './profileMasterContainer.scss';

const ProfileMasterContainer = (): JSX.Element => {
  return (
    <div className="profile-master-container">
      <div className="header3">Profile</div>
      <Spacer size="large" />

      <div className="header4">Proposals</div>
      <Spacer size="medium" />

      <div className="header4">Badges</div>
      <Spacer size="medium" />
    </div>
  );
};

export default ProfileMasterContainer;
