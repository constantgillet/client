import React from "react";
import { Radio as AntRadio } from "antd";
import styled, { css } from "styled-components";
import { MainStyle } from "../styles/style";
import { rgba } from "polished";

const { Button, Group } = AntRadio;

const RadioElement = styled(AntRadio)``;

function Radio(props) {
  return <RadioElement {...props} />;
}

const RadioButtonElement = styled(Button)`
  border: ${MainStyle.card.border};
  border-top-width: 1.02px;
  border-left-width: 0;

  &:hover {
    color: ${MainStyle.color.primary};
  }

  &:first-child {
    border-left: ${MainStyle.card.border};
    border-radius: ${MainStyle.radius.s}px 0 0 ${MainStyle.radius.s}px;
  }

  &:last-child {
    border-right: ${MainStyle.card.border};
    border-radius: 0 ${MainStyle.radius.s}px ${MainStyle.radius.s}px 0;
  }
`;

function RadioButton(props) {
  return <RadioButtonElement {...props} />;
}

const RadioGroupElement = styled(Group)`
  ${({ buttonStyle }) =>
    buttonStyle === "solid"
      ? css`
          .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
            background: ${MainStyle.color.primary};
            border-color: ${MainStyle.color.primary};

            &:hover {
              background: ${MainStyle.color.primary};
              border-color: ${MainStyle.color.primary};
            }
          }
        `
      : css``}
`;

function RadioGroup(props) {
  return <RadioGroupElement {...props} />;
}

Radio.Group = RadioGroup;
Radio.Button = RadioButton;
export default Radio;
