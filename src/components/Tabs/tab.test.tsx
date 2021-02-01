import React from 'react';
import { cleanup, fireEvent, render,RenderResult } from '@testing-library/react'
import { TabProps } from './tabs';
import TabItem from './tabItem';
import Tabs from './tabs';

const generateTab = (props:TabProps) =>
<Tabs {...props}> 
  <TabItem label="选项卡一">one</TabItem>
  <TabItem label="选项卡二">two</TabItem>
  <TabItem label="disabled" disabled> this is card three</TabItem>
</Tabs>



const testTabLineProps: TabProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test',
  mode:'card',
}
const testCardProps: TabProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test',
  mode:'line',
}
let wrapper:RenderResult, tabElement:HTMLElement, disableElement:HTMLElement, activeElement:HTMLElement, panel:HTMLElement;
describe('test tab and tabItem components in default line mode', ()=>{
  beforeEach(()=>{
    wrapper = render(generateTab(testTabLineProps));
    tabElement= wrapper.getByTestId('test-tab');
    disableElement = wrapper.getByText('disabled');
    activeElement = wrapper.getByText('选项卡一');
  })
 
  it('should render correct tab and tab items  based on props', ()=>{
    expect(tabElement).toBeInTheDocument();
    expect(tabElement.querySelectorAll(':scope>ul>li').length).toEqual(3);
    expect(disableElement).toHaveClass('disabled');
    expect(activeElement).toHaveClass('is-active');
    let tabOne = wrapper.getByText('one');
    let tabTwo = wrapper.queryByText('two');
    expect(tabOne).toBeVisible();
    expect(tabTwo).not.toBeInTheDocument();
  });
  it('click tabItem should switch to content', () => {
    const { queryByText, getByText } = wrapper
    const clickedElement = getByText('选项卡二')
    fireEvent.click(clickedElement)
    expect(clickedElement).toHaveClass('is-active')
    expect(queryByText('选项卡二')).toHaveClass('is-active')
    expect(queryByText('two')).toBeInTheDocument()
    expect(queryByText('one')).not.toBeInTheDocument()
    expect(testTabLineProps.onSelect).toHaveBeenCalledWith(1)
  });
  it('click disabled tabs should not work', () => {
    fireEvent.click(disableElement)
    expect(testTabLineProps.onSelect).not.toHaveBeenCalledWith()
    expect(disableElement).not.toHaveClass('is-active')
  });
})

describe('test tab and tabs items in card mode', ()=>{
  const wrapper = render(generateTab(testCardProps));
  tabElement= wrapper.getByTestId('test-tab');
  it('should render card style with correct mode', ()=>{
    expect(tabElement.querySelector('ul')).toHaveClass('nav-card');
  })
  cleanup();
})



