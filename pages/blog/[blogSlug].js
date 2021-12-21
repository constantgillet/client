import { Col, Row } from "antd";
import axios from "axios";
import { parse } from "node-html-parser";
import React from "react";
import styled from "styled-components";
import AdBanner from "../../components/AdBanner";
import Container from "../../components/Container";
import Main from "../../components/Main";
import Meta from "../../components/Meta";
import { MainStyle } from "../../styles/style";

const MainElement = styled(Main)`
  padding-top: ${MainStyle.space.l}px;
  padding-bottom: ${MainStyle.space.l}px;
`;

const TitleItem = styled.h1`
  font-weight: 800;
  font-size: 42px;
  text-align: center;
  margin-bottom: ${MainStyle.space.s}px;

  @media (max-width: ${MainStyle.breakpoint.md}px) {
    font-size: 32px;
  }
`;

const DateItem = styled.div`
  text-align: center;
  color: gray;
  margin-bottom: ${MainStyle.space.l}px;
`;

const AdBannerElement = styled(AdBanner)`
  margin-top: ${MainStyle.space.l}px;
`;

const ArticleContainer = styled.div`
  background: white;
  border-radius: ${MainStyle.radius.m}px;
  padding: ${MainStyle.space.l}px;

  img {
    max-width: 100%;
    height: auto;
    border-radius: ${MainStyle.radius.m}px;
  }

  p {
    font-size: 16px;
  }

  h2 {
    font-size: 24px;
    font-weight: bold;
  }
`;

export default function ArticlePage({ article }) {
  let title = parse(article.title.rendered);
  title = title.textContent;

  const date = new Date(article.date);
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

  const dateString = date.toLocaleDateString(undefined, options);

  return (
    <MainElement>
      <Meta title={`${title} | Upgear`} />
      <Container>
        <Row justify="center">
          <Col md={16}>
            <ArticleContainer>
              <TitleItem dangerouslySetInnerHTML={{ __html: article.title.rendered }} />
              <DateItem>Posté le {dateString}</DateItem>
              <div dangerouslySetInnerHTML={{ __html: article.content.rendered }}></div>
            </ArticleContainer>
            <AdBannerElement />
          </Col>
        </Row>
      </Container>
    </MainElement>
  );
}

export async function getServerSideProps({ params, res }) {
  const { blogSlug } = params;

  try {
    const res = await axios.get(`https://headless.upgear.fr/wp-json/wp/v2/posts?slug=${blogSlug}`);

    return {
      props: { article: res.data[0] } // will be passed to the page component as props
    };
  } catch (error) {}
}
