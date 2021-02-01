import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Menu, { MenuProps } from "./menu";
import menuItem, { MenuItemProps } from "./menuItem";
import MenuItem from "./menuItem";

export default {
  title: "mj-template/Menu",
  component: Menu,
} as Meta;

export const Template: Story<MenuProps> = (args) => (
  <Menu {...args}>
    <MenuItem>1</MenuItem>
    <MenuItem>2</MenuItem>
    <MenuItem>3</MenuItem>
  </Menu>
);
