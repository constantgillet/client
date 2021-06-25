import React from "react";
import { Menu as AntMenu } from "antd";
import styled, { css } from "styled-components";
import { MainStyle } from "../styles/style";
import { darken } from "polished";

const MenuElement = styled(AntMenu)`
  border: 1.5px solid #f2f3f7;
  border-radius: ${MainStyle.radius.m}px;
  filter: drop-shadow(0px 5px 14px rgba(0, 0, 0, 0.1));
  padding: 8px 8px;
  background: white;
  width: max-content;
`;

function Menu(props) {
  return <MenuElement {...props} />;
}

/**
 * Item
 */
const MenuItemElement = styled(AntMenu.Item)`
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: normal;
  border-radius: 4px;
  padding: ${MainStyle.space.s}px ${MainStyle.space.m}px;
  color: ${MainStyle.color.dark};

  &:hover {
    color: ${MainStyle.color.dark};
  }

  &:hover {
    background-color: ${darken(0.05, MainStyle.color.light)};
  }
`;

function Item(props) {
  return <MenuItemElement {...props} />;
}

Menu.Item = Item;
export default Menu;
