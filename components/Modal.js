import { Modal as AnModal } from "antd";
import { rgba } from "polished";
import styled, { css } from "styled-components";
import { MainStyle } from "../styles/style";

const ModalElement = styled(AnModal)`
  .ant-modal-header {
    border-radius: ${MainStyle.radius.m}px ${MainStyle.radius.m}px 0 0;
  }
  .ant-modal-content {
    border-radius: ${MainStyle.radius.m}px;
  }
`;

function Modal(props) {
  return <ModalElement {...props} />;
}

export default Modal;
