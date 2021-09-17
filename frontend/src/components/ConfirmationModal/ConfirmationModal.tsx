import CloseCross from 'assets/svg/CloseCross';
import Button from 'components/Button/Button';
import Spacer from 'components/Spacer/Spacer';
import './confirmationModal.scss';

interface modalOwnProps {
  children?: JSX.Element;
  onClose: () => void;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  onPrimaryComponent?: JSX.Element;
  title?: string;
  onPrimary: any;
  onSecondary: any;
  primaryText: string;
  secondaryText: string;
  bodyText?: string;
}

type allProps = modalOwnProps;

export const ConfirmationModal = (props: allProps): JSX.Element | null => {
  const {
    children,
    onClose,
    maxWidth,
    onPrimaryComponent,
    height,
    title,
    onPrimary,
    onSecondary,
    primaryText,
    secondaryText,
    bodyText,
  } = props;

  return (
    <div className="confirmation-master-modal-container fade-in-short">
      <div className="confirmation-inner-modal-container" style={{ maxWidth: maxWidth, height: height }}>
        <div className="confirmation-modal-topbar-container">
          <div onClick={() => onClose()} className="pointer confirmation-close-button-container">
            <CloseCross />
          </div>
          {onPrimaryComponent}
        </div>
        <Spacer size="small" />
        <div className="header2">{title}</div>
        <Spacer size="medium" />
        <div className="body1">{bodyText}</div>
        {children}
        <Spacer size="xxlarge" />
        <div className="confirmation-dialog-bottom-bar-container">
          <Button onClick={async () => await onPrimary()}>{primaryText}</Button>
          <div onClick={async () => await onSecondary()} style={{ marginRight: '16px' }} className="pointer">
            {secondaryText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
