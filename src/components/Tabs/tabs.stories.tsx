import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions'
import Tabs,{ TabProps } from './tabs';
import TabItem from './tabItem';
import Icon from '.././Icon/icon'

export default {
  title: 'mj-template/tabs',
  component: Tabs,
} as Meta;
// export const Empty : Story<TabProps> = (args) => <Tabs {...args} />;
const Template: Story<TabProps> = (args) => <Tabs {...args}>
<TabItem label="选项卡一">this is content one</TabItem>
<TabItem label="选项卡二">this is content two</TabItem>
<TabItem label="用户管理">this is content three</TabItem>
</Tabs>;

export const defaultTabs = Template.bind({});
defaultTabs.args= {
  mode:'line',
  defaultIndex:1,
}
export const cardTabs = () => (
  <Tabs onSelect={action('selected')} mode="card">
    <TabItem label='card1'>this is card one</TabItem>
    <TabItem label="card2">this is content two</TabItem>
    <TabItem label="disabled" disabled>this is content three</TabItem>
  </Tabs> 
)

export const customTabs = () => (
  <Tabs onSelect={action('selected')} mode="card">
    <TabItem label={<><Icon icon="check-circle" />  自定义图标</>}>this is card one</TabItem>
    <TabItem label="tab2">this is content two</TabItem>
  </Tabs> 
)