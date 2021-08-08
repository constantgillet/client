import { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { MainStyle } from "../styles/style";
import { rgba, darken } from "polished";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/fontawesome-free-solid";
import { Button as AntButton } from "antd";

const ButtonElement = styled(AntButton)`
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  border: 1px solid transparent;
  border-radius: ${MainStyle.radius.s}px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  cursor: pointer;
  padding: 9px 15px;
  background-color: ${MainStyle.color.primary};
  color: white;
  text-transform: uppercase;
  font-size: ${MainStyle.text.bodyBold.fontSize};
  font-weight: ${MainStyle.text.bodyBold.fontWeight};
  height: auto;

  & > svg {
    margin-right: 8px;
  }

  &:focus,
  &:active {
    font-weight: ${MainStyle.text.bodyBold.fontWeight};
    outline: 0;
    box-shadow: 0 0 0 0.2rem ${rgba(MainStyle.color.primary, 0.2)};
    background: ${darken(0.1, MainStyle.color.primary)};
    color: white;
  }

  &:hover {
    font-weight: ${MainStyle.text.bodyBold.fontWeight};
    background: ${darken(0.1, MainStyle.color.primary)};
    color: white;
  }

  ${({ type }) =>
    type == "link"
      ? css`
          color: ${MainStyle.color.primary};
          background: transparent;
          border-color: transparent;
          box-shadow: none;

          &:focus,
          &:active {
            background: transparent;
            border-color: transparent;
            box-shadow: none;
            color: ${darken(0.1, MainStyle.color.primary)};
          }

          &:hover {
            background: transparent;
            border-color: transparent;
            box-shadow: none;
            color: ${darken(0.1, MainStyle.color.primary)};
          }
        `
      : type == "outline"
      ? css`
          color: ${MainStyle.color.primary};
          background: transparent;
          border: 1px solid ${MainStyle.color.primary};
        `
      : type == "outline-light"
      ? css`
          color: ${MainStyle.color.light};
          background: transparent;
          border: 1px solid ${MainStyle.color.light};

          &:focus,
          &:active {
            outline: 0;
            box-shadow: 0 0 0 0.2rem ${rgba(MainStyle.color.light, 0.2)};
            background: ${MainStyle.color.light};
            color: ${darken(0.1, MainStyle.color.dark)};
          }

          &:hover {
            background: ${MainStyle.color.light};
            color: ${darken(0.1, MainStyle.color.dark)};
            border-color: ${MainStyle.color.light};
          }
        `
      : null}
`;

export default function Button(props) {
  const { children } = props;

  return <ButtonElement {...props}>{children}</ButtonElement>;
}
