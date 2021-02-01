import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Select, { SelectProps } from "./select";
import Option from "./option";

export default {
  title: "mj-template/Select",
  component: Select,
} as Meta;

export const Template: Story<SelectProps> = (args) => (
  <Select {...args}>
    <Option value="1">1</Option>
    <Option value="2">2</Option>
    <Option value="3">3</Option>
  </Select>
);
