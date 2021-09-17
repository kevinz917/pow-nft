import CloseCross from 'assets/svg/CloseCross';
import Spacer from 'components/Spacer/Spacer';
import './modal.scss';

interface modalOwnProps {
  children: JSX.Element;
  onClose: () => void;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  onPrimaryComponent?: JSX.Element;
}

type allProps = modalOwnProps;

export const Modal = (props: allProps): JSX.Element | null => {
  const { children, onClose, minWidth, maxWidth, onPrimaryComponent, height } = props;

  return (
    <div className="master-modal-container fade-in-short">
      <div className="inner-modal-container" style={{ maxWidth: maxWidth, height: height }}>
        <div className="modal-topbar-container">
          <div onClick={() => onClose()} className="pointer close-button-container shake">
            <CloseCross />
          </div>
          {onPrimaryComponent}
        </div>
        <br />
        <Spacer size="large" />
        {children}
      </div>
    </div>
  );
};

export default Modal;
