import React , { useContext, FunctionComponentElement, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';
import Transition from './../Transition/transition';

export interface SubMenuProps {
  index?:string;
  title:string;
  className?:string;
}
const SubMenu: React.FC<SubMenuProps> = ({index, title, children, className})=>{
  const context   = useContext(MenuContext);
  const classes = classNames('mj-menu-item submenu-item', className, {
    'is-active':context.index === index
  })
  const openedSubMenus = context.defaultOpenSubMenus as string[];
  const isOpen = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false

  const [ menuOpen, setOpen] = useState(isOpen);
  const subMenuClasses = classNames('mj-submenu', {
    'is-opened': menuOpen
  })
  const handClick = (e:React.MouseEvent) =>{
    setOpen(!menuOpen);
  }
  let timer :any;
  const handleMouse = (e:React.MouseEvent, toggle:boolean) =>{
    clearTimeout(timer);
    e.preventDefault();
    setTimeout(() => {
        setOpen(toggle)
    }, 100);
  }
  const clickEvents = context.mode === 'vertical'?{
    onClick:handClick
  }:{};

  const hoverEvent = context.mode === 'horizontal'?{
    onMouseEnter:(e:React.MouseEvent) =>{ handleMouse(e, true)},
    onMouseLeave:(e:React.MouseEvent) =>{ handleMouse(e, false)}
  }:{};
  const renderChildren = ()=>{
    const childrenComponent = React.Children.map(children, (child, i)=>{
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if(childElement.type.displayName === 'MenuItem'){
        return React.cloneElement(childElement,{
          index:`${index}-${i}`
        } )
      } else {
        console.error('Warning: SubMenu has a child which is not a menu item element')
      }
    })
    return (
      <Transition
        in={menuOpen}
        timeout = {300}
        animation = "zoom-in-left"
      >
        <ul className ={subMenuClasses}>
          { childrenComponent }
        </ul>
      </Transition>
    )
  }
  return (
    <li key = {index} className={classes} {...hoverEvent}>
      <div className="submenu-title" {...clickEvents}>
        { title }
      </div>
      {renderChildren()}
    </li>
  )
}
export default SubMenu;
SubMenu.displayName = 'SubMenu';