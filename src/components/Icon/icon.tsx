import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(fas);
export type ThemeProps ='primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';
export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps
}

const Icon:React.FC<IconProps> = (props) =>{
  const { className, theme, ...resetProps } = props;
  const classes = classNames('mj-icon', classNames, {
    [`icon-${theme}`]:theme
  })
  return (
    <FontAwesomeIcon className={classes} {...resetProps} />
  )
}
export default Icon;