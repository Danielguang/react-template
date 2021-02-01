import React, {FC, ButtonHTMLAttributes, AnchorHTMLAttributes} from 'react'
import classNames from 'classnames'

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string,
}
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
// 将属性合并，然后partial 修饰变成可选
export type ButtonProps = Partial <NativeButtonProps & AnchorButtonProps>;
export const Button: FC<ButtonProps> = (props) => {
  const { btnType, disabled, size, className, children, href,...resetProps } = props;
  //btn, btn-lg, btn-primary
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === 'link') && disabled,
  });
  if (btnType === 'link' && href) {
    return (
      <a className={classes}
        href={href}
        {...resetProps}
      >
        {children}
      </a>
    )
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
        {...resetProps}
      >
        {children}
      </button>
    )
  }
}
Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}
export default Button;