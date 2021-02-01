import React from 'react';
export interface TabItemsProp {
  label:any;
  disabled?:boolean;
  className?:string;
}

const TabItem:React.FC<TabItemsProp> = (props) =>{
  const { children } = props;
  return (
    <div className="mj-tab-panel">
      {children}
    </div>
  )
} 
TabItem.displayName = 'TabItem';
export default TabItem;
