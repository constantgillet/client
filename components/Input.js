import React from "react";
import { Input as AntInput } from "antd";
import styled, { css } from "styled-components";
import { MainStyle } from "../styles/style";
import { rgba } from "polished";

const InputElement = styled(AntInput)`
  border-radius: ${MainStyle.radius.s}px;
  border: 1px solid #e3e3e3;
  font-size: 14px;
  width: 100%;
  padding: 8px 15px;
  font-size: ${MainStyle.text.body.fontSize};
  font-weight: ${MainStyle.text.body.fontWeight};
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    border-color: ${MainStyle.color.primary};
    outline: none;
  }

  &::placeholder {
    font-size: ${MainStyle.text.body.fontSize};
    font-weight: ${MainStyle.text.body.fontWeight};
  }

  ${({ error }) =>
    error &&
    css`
      border-color: ${MainStyle.color.danger};

      &:hover,
      &.ant-input-affix-wrapper:hover {
        border-color: ${MainStyle.color.danger};
      }

      &:focus,
      &.ant-input-affix-wrapper:focus {
        border-color: ${MainStyle.color.danger};
        outline: none;
        box-shadow: 0 0 0 2px ${rgba(MainStyle.color.danger, 0.2)};
      }
    `}
`;

export default function Input(props) {
  return <InputElement {...props} />;
}
