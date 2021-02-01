import React from 'react';
import { fireEvent, render,RenderResult,waitFor } from '@testing-library/react'
import Menu,{ MenuProps } from './menu';
import MenuItem from './menuItem'
import SubMenu from './subMenu';
const generateMenu = (props:MenuProps) =>
  <Menu {...props}>
      <MenuItem index = ''>
        active
      </MenuItem>
      <MenuItem index = '1' disabled>
        disabled
      </MenuItem>
      <MenuItem index = '2'>
        xyz
      </MenuItem>
      <SubMenu title = 'dropdown'>
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
            <MenuItem>dropdown 3</MenuItem>
      </SubMenu>
    </Menu>



const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}
const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical'
}
let wrapper:RenderResult, menuElement:HTMLElement, activeElement:HTMLElement,disabledElement:HTMLElement; 
const createStyleFile = ()=>{
  const cssFile:string = `
    .mj-submenu {
      display:none;
    }
    .mj-submenu.is-opened {
      display:block;
    }
  `
  const style = document.createElement('style');
  style.innerHTML = cssFile;
  return style;
}
describe('test menu and menuItem components in default(horizontal) mode', ()=>{
  beforeEach(()=>{
    wrapper = render(generateMenu(testProps));
    menuElement= wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled');
  })
  it('should render correct menu and menu items  based on props', ()=>{
    expect(menuElement).toBeInTheDocument();
    expect(activeElement).toHaveClass('mj-menu-item is-active');
    expect(disabledElement).toHaveClass('mj-menu-item is-disabled');
    expect(menuElement.querySelectorAll(':scope>li').length).toEqual(4);
  });
  it('click items should change active and call right callback', () =>{
    const thirdItem = wrapper.getByText('xyz');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')

  })
  it('should show dropDown menu when hover on subMenu', async ()=>{
      wrapper.container.append(createStyleFile());
      expect(wrapper.queryByText('dropdown 1')).not.toBeInTheDocument();
      const dropDownElement = wrapper.getByText('dropdown');
      fireEvent.mouseEnter(dropDownElement);
      await waitFor(()=>{
        expect(wrapper.queryByText('dropdown')).toBeVisible();
        fireEvent.click(wrapper.getByText('dropdown 1'));
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
      })
      fireEvent.mouseLeave(dropDownElement);
      await waitFor(()=>{
        expect(wrapper.queryByText('dropdown 1')).not.toBeVisible();
      })
  })
})
describe('test menu and menuItem component in vertical mode', () =>{
  it('should render vertical mode when mode is set to vertical mode', ()=>{
    const wrapper = render(generateMenu(testVerProps));
    const menuElement = wrapper.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical')
  })
})