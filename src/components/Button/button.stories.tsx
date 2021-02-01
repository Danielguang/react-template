import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';

import Button,{ ButtonProps } from './button'

export default {
  title: 'mj-template/button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  btnType:'primary',
  children: '主按钮',
};
export const buttonWithSize = () => (
  <>
    <Button size="lg"> large button </Button>
    <Button size='sm'> small button </Button>
  </>
)

export const buttonWithType = () => (
  <>
    <Button btnType='primary'> primary button </Button>
    <Button btnType='danger'> danger button </Button>
    <Button btnType='link' href="https://google.com"> link button </Button>
    <Button btnType='default'> default button </Button>
  </>
)