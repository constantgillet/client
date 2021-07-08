import React from "react";
import styled from "styled-components";

const Element = styled.hr`
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: content-box;
  height: 0;
  overflow: visible;
  margin: 0;
`;

export default function Separator({ style, className }) {
  return <Element className={className} style={style} />;
}
