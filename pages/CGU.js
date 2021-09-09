import { Col, Row } from "antd";
import axios from "axios";
import React from "react";
import Container from "../components/Container";
import Main from "../components/Main";
import Meta from "../components/Meta";

export default function CGU({ content }) {
  return (
    <Main>
      <Meta title="Conditions d'utilisations | Upgear" />
      <Container>
        <Row justify="center">
          <Col span={24} md={16}>
            <div className="content" dangerouslySetInnerHTML={{ __html: content }}></div>
          </Col>
        </Row>
      </Container>
    </Main>
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
