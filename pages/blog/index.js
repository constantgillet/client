import { Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "../../components/Container";
import Main from "../../components/Main";
import Meta from "../../components/Meta";
import { MainStyle } from "../../styles/style";
import Link from "next/link";

const MainElement = styled(Main)`
  padding-top: ${MainStyle.space.l}px;
  padding-bottom: ${MainStyle.space.l}px;
`;

const PageTitle = styled.h1`
  font-size: ${MainStyle.text.title.fontSize};
  font-weight: ${MainStyle.text.title.fontWeight};
  text-align: center;
`;

const LastArticleDate = styled.div`
  display: inline-block;
  color: gray;
`;

const LastArticleTitle = styled.h1`
  font-size: ${MainStyle.text.subtitle.fontSize};
  font-weight: bold;
`;

const Article = styled.article`
  border-radius: ${MainStyle.radius.m}px;
  background: white;
  border: ${MainStyle.card.border};
  margin-bottom: ${MainStyle.space.m}px;
`;

const ArticleContentCol = styled(Col)`
  padding: ${MainStyle.space.m}px;
`;

const ArticleImage = styled.div`
  background-size: cover;
  height: 100%;
  display: block;
  background-position: 38% 22% !important;
  background-origin: border-box !important;
  border-top-left-radius: ${MainStyle.radius.m}px;
  border-bottom-left-radius: ${MainStyle.radius.m}px;
  height: 182px;

  @media (max-width: ${MainStyle.breakpoint.md}px) {
    border-top-right-radius: ${MainStyle.radius.m}px;
    border-bottom-left-radius: 0px;
    height: 162 px;
  }
`;

export default function Blog({ articles }) {
  const lastArticleDate = new Date(articles[0]?.date);

  return (
    <MainElement>
      <Meta title="Blog | Upgear" />
      <Container>
        <PageTitle>Articles</PageTitle>
        <Row gutter={32}>
          {articles.map((article, index) => {
            const articleDate = new Date(article?.date);

            return (
              <Col span={24} md={12} key={index}>
                <Article>
                  <Row>
                    <Col span={24} md={8}>
                      <Link href={"/blog/" + articles[index]?.slug}>
                        <a title={"Article"}>
                          {article._embedded.hasOwnProperty("wp:featuredmedia") ? (
                            <ArticleImage
                              style={{
                                backgroundImage: `url(${article?._embedded["wp:featuredmedia"][0]["source_url"]})`
                              }}
                            />
                          ) : (
                            <div>No image</div>
                          )}
                        </a>
                      </Link>
                    </Col>
                    <ArticleContentCol span={24} md={16}>
                      <Link href={"/blog/" + articles[index]?.slug}>
                        <a title={"Article"}>
                          <LastArticleTitle
                            dangerouslySetInnerHTML={{
                              __html: articles[index]?.title ? articles[index]?.title.rendered : ""
                            }}
                          ></LastArticleTitle>
                        </a>
                      </Link>
                      <div
                        title={"Article"}
                        dangerouslySetInnerHTML={{
                          __html: articles[index]?.excerpt ? articles[index]?.excerpt.rendered : ""
                        }}
                      ></div>
                      <LastArticleDate title={"Article"}>
                        {articleDate
                          ? articleDate.toLocaleString("fr-FR", {
                              month: "long",
                              day: "numeric",
                              year: "numeric"
                            })
                          : ""}
                      </LastArticleDate>
                    </ArticleContentCol>
                  </Row>
                </Article>
              </Col>
            );
          })}
        </Row>
      </Container>
    </MainElement>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await axios.get("https://headless.upgear.fr/wp-json/wp/v2/posts?_embed");

    return {
      props: { articles: res.data } // will be passed to the page component as props
    };
  } catch (error) {}
}
