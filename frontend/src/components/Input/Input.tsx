import React from 'react';
import RenderIf from 'components/RenderIf/RenderIf';
import { isNil } from 'lodash';
import './input.scss';
import classNames from 'classnames';

interface inputOwnProps {
  caption?: string;
  rightCaption?: string;
  value: string;
  error?: boolean;
  onChange: any;
  instruction?: string;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  isTextarea?: boolean;
  rows?: number;
  disableResize?: boolean;
}

const Input = (props: inputOwnProps): JSX.Element => {
  const {
    caption,
    value,
    error,
    instruction,
    onChange,
    placeholder,
    rightCaption,
    maxLength,
    disabled,
    isTextarea,
    rows,
    disableResize,
  } = props;

  return (
    <React.Fragment>
      <div className="input-main-caption-container">
        <RenderIf value={!isNil(caption)}>
          <div style={{ marginBottom: '10px' }} className={`body2 uppercase ${error ? 'error-text' : ''}`}>
            {caption}
          </div>
        </RenderIf>

        <RenderIf value={!isNil(rightCaption)}>
          <div style={{ marginBottom: '10px' }} className={`body2 uppercase ${error ? 'error-text' : ''}`}>
            {rightCaption}
          </div>
        </RenderIf>
      </div>

      <RenderIf value={isTextarea || false}>
        <textarea
          className={classNames('input-main input-text-area', { 'input-textarea-disable-resize': disableResize })}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength || 1000000}
          rows={rows}
        />
      </RenderIf>

      <RenderIf value={!isTextarea || false}>
        <input
          className="input-main"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength || 1000000}
          disabled={disabled}
        />
      </RenderIf>
      <div className="body1" style={{ opacity: 0.5 }}>
        {instruction}
      </div>
    </React.Fragment>
  );
};

export default Input;
