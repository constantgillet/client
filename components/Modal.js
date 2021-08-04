import { Modal as AnModal } from "antd";
import { rgba } from "polished";
import styled, { css } from "styled-components";
import { MainStyle } from "../styles/style";
import Button from "./Button";

const ModalElement = styled(AnModal)`
  .ant-modal-header {
    border-radius: ${MainStyle.radius.m}px ${MainStyle.radius.m}px 0 0;

    .ant-modal-title {
      font-weight: 600;
      font-size: 18px;
    }
  }
  .ant-modal-content {
    border-radius: ${MainStyle.radius.m}px;
  }
`;

function Modal(props) {
  return (
    <ModalElement
      {...props}
      footer={
        <div>
          {props.cancelText ? (
            <Button type="outline" onClick={props.onOk}>
              {props.cancelText}
            </Button>
          ) : (
            <></>
          )}
          {props.okText ? <Button onClick={props.onCancel}>{props.okText}</Button> : <></>}
        </div>
      }
    />
  );
}

export default Modal;
