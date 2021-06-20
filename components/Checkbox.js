import React from "react";
import styled from "styled-components";
import { MainStyle } from "../styles/style";
import { Checkbox as AntdCheckbox } from "antd";

const CheckboxElement = styled(AntdCheckbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${MainStyle.color.primary};
    border-color: ${MainStyle.color.primary};
  }
`;

export default function Checkbox(props) {
  const { children } = props;

  return <CheckboxElement {...props}>{children}</CheckboxElement>;
}
