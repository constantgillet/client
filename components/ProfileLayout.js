import { Col, Row } from "antd";
import React from "react";
import styled from "styled-components";
import { MainStyle } from "../styles/style";

const RowElement = styled(Row)`
  padding: ${MainStyle.space.l}px 0px;
`;

export default function ProfileLayout({ ...props }) {
  return (
    <RowElement gutter={MainStyle.gutter}>
      <Col md={6}></Col>
      <Col md={18}>{props.children}</Col>
    </RowElement>
  );
}
