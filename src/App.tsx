
import React, { useState } from 'react';
// import Button, { ButtonType, ButtonSize } from './components/Button/button';
// import Alert, { AlertType } from './components/Alert_bk/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

import Tabs from './components/Tabs/tabs';
import TabItem from './components/Tabs/tabItem';
import Icon from './components/Icon/icon';
import Input from './components/Input/input';

function App() {
  const [val, setVal] = useState('');
  return (
    <div className="App">
      {/* <Button autoFocus> default button</Button>
      <Button disabled> Disabled Button</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}> Large Btn</Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Small}> Small Btn</Button>
      <Button btnType={ButtonType.Link} href="http://www.baidu.com" target="_blank"> Baidu Link</Button>
      <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled> Link disabled</Button> */}
      {/* <Icon icon ='coffee' theme='primary' size='10x' /> */}
      <div style={{ margin: `30px`}}>
        <Input
          size='lg'
          value={val}
          onChange={(e)=> {setVal(e.target.value)}}
          defaultVal='123'
          suffix={<Icon icon='coffee' />}
          style={{ width: `${300}px` }}
          append={<div>testing</div>}
        />
      </div>
      <Input disabled />
      <div className="content">
        <Tabs mode='card' className='123'>
          <TabItem label="选项卡一"> this is card one</TabItem>
          <TabItem label="选项卡二"> this is card two</TabItem>
          <TabItem label="选项卡三" disabled> this is card three</TabItem>
        </Tabs>
      </div>


      <div className='content'>
        <Menu defaultOpenSubMenus={['3']}>
          <MenuItem>菜单 1</MenuItem>
          <MenuItem disabled>菜单 3</MenuItem>
          <MenuItem>菜单 2</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
            <MenuItem>dropdown 3</MenuItem>
          </SubMenu>
        </Menu>
      </div>
      {/* <div className='content'>
        <Alert alertType={AlertType.Danger} message='这是一个危险的警告' closable/>
        <Alert alertType={AlertType.Default} message='这是一个正常的警告' description="这是内容"/>
        <Alert alertType={AlertType.Success} message='这是一个成功的警告' />
        <Alert alertType={AlertType.Warning} message='这是一个警告' />
      </div> */}
    </div>
  );
}

export default App;
