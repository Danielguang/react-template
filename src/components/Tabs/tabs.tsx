import React, { useState, createContext} from 'react';
import classNames from 'classnames';
import { TabItemsProp } from './tabItem';
type tabMode ='card' | 'line';
type selectCallBack =(selectedIndex:number) => void;

export interface TabProps {
  disabled?:boolean,
  className?:string,
  defaultIndex?:number,
  mode?:tabMode,
  onSelect?:selectCallBack;
}

interface ITabContext {
  index:number;
  onSelect?:selectCallBack;
  mode?:tabMode;
}
export const TabConText = createContext<ITabContext>({
  index:0,
  mode:'line'
});
export const Tabs:React.FC<TabProps> = (props) =>{
  const { className, mode,children, defaultIndex, onSelect } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames('mj-tabs-nav', className, {
    'nav-card': mode ==='card',
    'nav-line':mode=== 'line'
  });

  const handleClick =(index:number,disabled:boolean | undefined)=>{
    if(!disabled){
      setActive(index);
      if(onSelect){
        onSelect(index)
      }
    }
  }
  const renderNavLinks = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<TabItemsProp>
      const { label, disabled } = childElement.props
      const classes = classNames('mj-tabs-nav-item', {
        'is-active': currentActive === index,
        'disabled': disabled,
      })
      return (
        <li 
          className={classes} 
          key={`nav-item-${index}`}
          onClick={()=> handleClick(index, disabled)}
        >
          {label}
        </li>
      )
    })
  }

  const renderContent = ()=> {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<TabItemsProp>
      const { displayName} = childElement.type;
      if(displayName === 'TabItem'){
        if (index === currentActive) {
          return child
        }
      }else {
        console.error('Warning: Tabs has a child which is not a TabItem')
      }
    })
  }

  return (
    <div className={`mj-tabs ${className?className:''}`} data-testid="test-tab">
       <ul className={classes}>
        {renderNavLinks()}
      </ul>
      <div className="mj-tabs-content" data-testid='test-panel'>
        {renderContent()}
      </div>
    </div>
  )
}


Tabs.defaultProps = {
  defaultIndex:0,
  mode:'line',
}
export default Tabs;