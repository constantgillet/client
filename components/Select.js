import { Select as AntSelect } from "antd";
import { rgba } from "polished";
import styled, { css } from "styled-components";
import { MainStyle } from "../styles/style";

const SelectElement = styled(AntSelect)`
  .ant-select-selector {
    border-radius: ${MainStyle.radius.s}px !important;
    border: 1px solid #e3e3e3 !important;
    font-size: 14px !important;
    padding: 8px 15px;
    font-size: ${MainStyle.text.body.fontSize};
    font-weight: ${MainStyle.text.body.fontWeight};
    line-height: 1.5;
    height: 39px !important;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    ${({ error }) =>
      error &&
      css`
        border: 1px solid ${MainStyle.color.danger} !important;
      `}

    ${({ mode }) =>
      mode == "multiple" &&
      css`
        height: auto !important;
        padding: 5px 12px;
      `}

    .ant-select-selection-placeholder {
      line-height: 37px !important;
    }
  }

  .ant-select-selection-item {
    display: flex;
    align-items: center;
  }

  .ant-select-selection-placeholder {
    line-height: 37px !important;
  }

  &.ant-select-focused {
    .ant-select-selector {
      border-color: ${MainStyle.color.primary} !important;
      outline: none;
      box-shadow: 0 0 0 2px ${rgba(MainStyle.color.primary, 0.2)} !important;

      ${({ error }) =>
        error &&
        css`
          border-color: ${MainStyle.color.danger} !important;
          box-shadow: 0 0 0 2px ${rgba(MainStyle.color.danger, 0.2)} !important;
        `}
    }
  }

  input {
    height: 100% !important;
  }
  /* &:focus {
    border-color: ${MainStyle.color.primary};
    outline: none;
  }

  &::placeholder {
    font-size: ${MainStyle.text.body.fontSize};
    font-weight: ${MainStyle.text.body.fontWeight};
  } */
`;

function Select(props) {
  return <SelectElement {...props} notFoundContent="Aucun résultat" dropdownStyle={{ zIndex: "2" }} />;
}

Select.OptGroup = AntSelect.OptGroup;
Select.Option = AntSelect.Option;
export default Select;
