import { Router, Route, Switch } from 'react-router-dom';
import ProposerMasterPage from './components/ProposerMasterPage/ProposerMasterPage';
import ReviewerMasterPage from './components/ReviewerMasterPage/ReviewerMasterPage';
import ProfileMasterContainer from './components/ProfileMasterContainer/ProfileMasterContainer';
import CommunityMasterContainer from './components/CommunityMasterContainer/CommunityMasterContainer';

import './styles/colors.scss';
import './styles/typography.scss';
import './styles/overall.scss';
import './styles/animation.scss';

import history from './components/Router/history';
import MasterNav from 'components/MasterNav/MasterNav';

const App = () => {
  return (
    <div>
      <Router history={history}>
        <MasterNav />
        <Switch>
          <Route exact path="/community" component={CommunityMasterContainer} />
          <Route exact path="/proposer" component={ProposerMasterPage} />
          <Route exact path="/proposals" component={ReviewerMasterPage} />
          <Route exact path="/profile" component={ProfileMasterContainer} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
