import { ReactElement } from 'react';
import { connect } from 'react-redux';
import RenderIf from '../RenderIf/RenderIf';
import './PageLoadingBar.scss';

interface pageLoadingStateProps {
  value: boolean;
}

const PageLoadingBar = (props: pageLoadingStateProps): ReactElement => {
  return <div className="progress-completed" />;
};

export default PageLoadingBar;
