import React, { PureComponent, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './button.scss';

interface buttonOwnProps {
  children: React.ReactNode;
  disabled?: boolean;
  secondary?: boolean;
  type?: string;
  href?: string;
  width?: string;
  icon?: string;
  onClick?: () => void;
}

export default class Button extends PureComponent<buttonOwnProps> {
  render(): ReactElement {
    const { children, disabled, secondary, type, href, width, onClick, ...otherProps } = this.props;

    const cssClasses = classNames('button-default', {
      'button-secondary': secondary,
      'button-disabled': disabled,
    });

    if (type === 'link') {
      return (
        <Link className={cssClasses} to={href || ''} {...otherProps} style={{ width: width }}>
          {children}
        </Link>
      );
    }

    return (
      <button className={cssClasses} style={{ width: width }} type="button" onClick={onClick} {...otherProps}>
        {children}
      </button>
    );
  }
}
