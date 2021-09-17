import classNames from 'classnames';
import RenderIf from 'components/RenderIf/RenderIf';
import { isNil } from 'lodash';
import { PureComponent, ReactElement } from 'react';
import ReactSelect from 'react-select';
import { valueLabel } from '../../common/types/globalTypes';
import './select.scss';

interface selectOwnProps {
  options: valueLabel[];
  placeholder?: string;
  menuIsOpen?: boolean;
  className?: string;
  onChange?: any;
  value?: valueLabel | null;
  isMulti?: boolean;
  disabled?: boolean;
  caption?: string;
  width?: string;
  isSearchable?: boolean;
}

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 20,
  }),
};

const generateCustomStyle = (width: string | null) => {
  if (!width) return;
  return {
    container: (provided: any, state: any) => ({
      ...provided,
      width: width,
    }),
  };
};

export default class Select extends PureComponent<selectOwnProps> {
  render(): ReactElement {
    const {
      options,
      placeholder,
      menuIsOpen,
      className,
      onChange,
      value,
      isMulti,
      disabled,
      caption,
      width,
      isSearchable,
    } = this.props;

    const selectClassNames = classNames('react-select-container', {
      className: className,
    });

    const renderValues = (value: any) => {
      if (isMulti) {
        return value;
      }
    };

    return (
      <div>
        <RenderIf value={!isNil(caption)}>
          <div style={{ marginBottom: '10px' }} className="body2 uppercase">
            {caption}
          </div>
        </RenderIf>

        <ReactSelect
          options={options}
          className={selectClassNames}
          classNamePrefix="react-select"
          placeholder={placeholder}
          menuIsOpen={menuIsOpen}
          onChange={onChange}
          value={renderValues(value)}
          // value={isNil(value) ? null : value?.value ? value : null}
          isMulti={isMulti}
          isDisabled={disabled}
          styles={generateCustomStyle(width || null)}
          isSearchable={isSearchable || false}
        />
      </div>
    );
  }
}
