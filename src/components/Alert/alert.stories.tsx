import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import Alert,{ AlertProps } from './alert'

export default {
  title: 'mj-template/alert',
  component: Alert,
} as Meta;


const Template: Story<AlertProps> = (args) => <Alert {...args} />;

export const PrimaryAlert = Template.bind({});
PrimaryAlert.args = {
  message:'message',
  description: '这里是内容',
};