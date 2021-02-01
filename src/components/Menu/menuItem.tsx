import React, { useContext } from 'react';
import classNames from 'classnames'
import { MenuContext } from './menu';

export interface MenuItemProps {
  index?:string;
  disabled?:boolean;
  className?:string;
}

const MenuItem:React.FC<MenuItemProps> = (props) =>{
  const { className, disabled ,children, index} = props;
  const context = useContext(MenuContext);
  const classes = classNames('mj-menu-item', className, {
    'is-disabled': disabled,
    'is-active':context.index === index,
  })
  const handClick = ()=>{
    if(context.onSelect && !disabled && typeof(index) === 'string'){
      context.onSelect(index);
    }
  }
  return(
    <li className= {classes} onClick= {handClick}>
      {children}
    </li>
  )
}
MenuItem.displayName = 'MenuItem'
export default MenuItem;