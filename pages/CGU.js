import { Col, Row } from "antd";
import axios from "axios";
import React from "react";
import Container from "../components/Container";
import Main from "../components/Main";
import Meta from "../components/Meta";
import Card from "../components/Card";
import styled from "styled-components";
import { MainStyle } from "../styles/style";

const MainElement = styled(Main)`
  padding-top: ${MainStyle.space.l}px;
  padding-bottom: ${MainStyle.space.l}px;
`;

const ContentContainer = styled(Card)`
  padding: ${MainStyle.space.xl}px;
`;
export default function CGU({ content }) {
  return (
    <MainElement>
      <Meta title="Conditions d'utilisations | Upgear" />
      <Container>
        <Row justify="center">
          <Col span={24} md={16}>
            <ContentContainer>
              <div className="content" dangerouslySetInnerHTML={{ __html: content }}></div>
            </ContentContainer>
          </Col>
        </Row>
      </Container>
    </MainElement>
  );
}

export async function getStaticProps(context) {
  const res = await axios.get(`https://headless.upgear.fr/wp-json/wp/v2/pages?slug=CGU`);
  const content = res.data[0].content.rendered || {};

  return {
    props: {
      content: content
    } // will be passed to the page component as props
  };
}
