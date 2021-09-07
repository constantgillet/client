import React from "react";
import { Input as AntInput, InputNumber as AntInputNumber } from "antd";
import styled, { css } from "styled-components";
import { MainStyle } from "../styles/style";
import { rgba } from "polished";

const baseInputStyles = css`
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

  &:focus,
  &.ant-input-number-focused {
    border-color: ${MainStyle.color.primary};
    box-shadow: 0 0 0 2px ${rgba(MainStyle.color.primary, 0.2)};
    outline: none;
  }

  &:hover {
    border-color: ${MainStyle.color.primary};
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
      & .ant-input-number-input:hover,
      &.ant-input-affix-wrapper:hover {
        border-color: ${MainStyle.color.danger};
      }

      &:focus,
      & .ant-input-number-input:focus,
      &.ant-input-affix-wrapper:focus {
        border-color: ${MainStyle.color.danger};
        outline: none;
        box-shadow: 0 0 0 2px ${rgba(MainStyle.color.danger, 0.2)};
      }
    `}
`;

const InputElement = styled(AntInput)`
  ${baseInputStyles}
`;

function Input(props) {
  return <InputElement {...props} />;
}

const TextAeraElement = styled(InputElement.TextArea)`
  ${baseInputStyles}
`;

function InputTextAera(props) {
  return <TextAeraElement {...props} />;
}

const InputNumberElement = styled(AntInputNumber)`
  ${baseInputStyles}
  width: 120px;
  height: 39px;

  .ant-input-number-input {
    height: fit-content;
    padding: 0px;
  }
`;

function InputNumber(props) {
  return <InputNumberElement {...props} />;
}

const InputMessageElement = styled.span`
  font-size: ${MainStyle.text.small.fontSize};
  text-align: left;

  ${({ type }) =>
    type === "error"
      ? css`
          color: ${MainStyle.color.danger};
        `
      : css`
          color: ${MainStyle.color.success};
        `}
`;

function InputMessage(props) {
  return props.message?.length ? (
    <InputMessageElement {...props}> {props.message} </InputMessageElement>
  ) : (
    <></>
  );
}

const InputLabelElement = styled.label`
  font-size: ${MainStyle.text.body.fontSize};
  font-weight: 600;
  margin-bottom: ${MainStyle.space.s}px;
  display: inline-block;
`;

function InputLabel(props) {
  return <InputLabelElement {...props}>{props.children}</InputLabelElement>;
}

Input.Label = InputLabel;
Input.Message = InputMessage;
Input.Number = InputNumber;
Input.TextAera = InputTextAera;
export default Input;
