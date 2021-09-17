import { ReactElement } from 'react';
import ReactSwitch from 'react-switch';
import RenderIf from '../RenderIf/RenderIf';
import './Switch.scss';

interface switchOwnProps {
  checked: boolean;
  name?: string;
  disabled?: boolean;
  onChange: (checked: boolean, event: any, name?: string) => void;
  label?: string;
}

const Switch = (props: switchOwnProps): ReactElement => {
  const { disabled, checked, onChange, name, label } = props;
  return (
    <div className="switch-container">
      <ReactSwitch
        width={42}
        height={22}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        name={name}
        checkedIcon={false}
        uncheckedIcon={false}
        boxShadow="0px 0px 1px 1px rgba(0,0,0,0.2)"
        onColor="#000000" // should switch to primary color
        offColor="#aaaaaa"
        activeBoxShadow=""
        handleDiameter={18}
      />
      <RenderIf value={(label && label.length > 0) || false}>
        <div className="switch-label">{label}</div>
      </RenderIf>
    </div>
  );
};

export default Switch;
