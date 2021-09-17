import React, { ReactElement } from 'react';
import { PureComponent } from 'react';
import './textarea.scss';

interface textAreOwnProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  height?: number;
  width?: number;
}

export default class TextArea extends PureComponent<textAreOwnProps> {
  render(): ReactElement {
    const { value, onChange, width, height } = this.props;
    return (
      <textarea
        value={value}
        onChange={onChange}
        className="textarea-main"
        style={{ width: `${width!}px`, height: `${height!}px` }}
      />
    );
  }
}
