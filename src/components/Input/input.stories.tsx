import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import Input,{ InputProps }from './input';
import Icon from './../Icon/icon';


export default {
  title: 'mj-template/input',
  component: Input,
} as Meta;


const Template: Story<InputProps> = (args) => <Input {...args}/>

export const defaultInput = Template.bind({});

export const DisabledInput = Template.bind({});
DisabledInput.args = {
  placeholder:'disabled',
  disabled:true
}

export const largeInput = Template.bind({});
largeInput.args = {
  placeholder:'this is a large input',
  size:'lg'
}

export const suffixIconInput = Template.bind({});
suffixIconInput.args = {
  defaultVal:'search icon',
  suffix:<Icon icon='search' />
}

export const prefixIconInput = Template.bind({});
prefixIconInput.args = {
  prefix:<Icon icon='search' />
}

export const PrependInput = Template.bind({});
PrependInput.args = {
  size:'lg',
  prepend:'搜索'
}

export const AppendInput = Template.bind({});
AppendInput.args = {
  size:'lg',
  append:'.com'
}


