import { Pagination as PaginationAntd } from "antd";
import { rgba } from "polished";
import styled from "styled-components";
import { MainStyle } from "../styles/style";

const PaginationElement = styled(PaginationAntd)`
  .ant-pagination-item-link,
  .ant-pagination-item,
  .ant-select-selector {
    border-radius: ${MainStyle.radius.s}px !important;
  }

  .ant-pagination-item-active a {
    color: ${MainStyle.color.primary};
  }

  .ant-pagination-item-active,
  .ant-pagination-item:hover {
    border-color: ${MainStyle.color.primary};
  }

  .ant-pagination-item:focus-visible a,
  .ant-pagination-item:hover a {
    color: ${MainStyle.color.primary};
  }

  .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
    border-color: ${MainStyle.color.primary};
  }

  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
    .ant-select-selector,
  .ant-select-focused .ant-select-selector {
    box-shadow: 0 0 0 2px ${rgba(MainStyle.color.primary, 0.2)};
  }

  .ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-link-icon,
  .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-link-icon {
    color: ${MainStyle.color.primary};
  }

  .ant-pagination-prev:focus-visible .ant-pagination-item-link,
  .ant-pagination-next:focus-visible .ant-pagination-item-link,
  .ant-pagination-prev:hover .ant-pagination-item-link,
  .ant-pagination-next:hover .ant-pagination-item-link {
    color: ${MainStyle.color.primary};
    border-color: ${MainStyle.color.primary};
  }
`;

export default function Pagination(props) {
  return <PaginationElement {...props} />;
}
