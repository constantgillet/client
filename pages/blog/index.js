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

const LastArticleDate = styled.a`
  display: inline-block;
  color: gray;
  margin-bottom: ${MainStyle.space.m}px;
`;

const LastArticleTitle = styled.h1`
  font-size: ${MainStyle.text.title.fontSize};
  font-weight: ${MainStyle.text.title.fontWeight};
`;

export default function Blog({ articles }) {
  const lastArticleDate = new Date(articles[0]?.date);

  console.log(articles);
  return (
    <MainElement>
      <Meta title="Blog | Upgear" />
      <Container>
        <PageTitle>Articles</PageTitle>
        <article>
          <Row>
            <Col span={12}></Col>
            <Col span={12}>
              <Link href={"/blog/" + articles[0]?.slug}>
                <LastArticleDate title={"Article"}>
                  {lastArticleDate
                    ? lastArticleDate.toLocaleString("fr-FR", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                      })
                    : ""}
                </LastArticleDate>
              </Link>
              <Link href={"/blog/" + articles[0]?.slug}>
                <a title={"Article"}>
                  <LastArticleTitle
                    dangerouslySetInnerHTML={{
                      __html: articles[0]?.title ? articles[0]?.title.rendered : ""
                    }}
                  ></LastArticleTitle>
                </a>
              </Link>
              <Link href={"/blog/" + articles[0]?.slug}>
                <a
                  title={"Article"}
                  dangerouslySetInnerHTML={{
                    __html: articles[0]?.excerpt ? articles[0]?.excerpt.rendered : ""
                  }}
                ></a>
              </Link>
            </Col>
          </Row>
        </article>
      </Container>
    </MainElement>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await axios.get("https://headless.upgear.fr/wp-json/wp/v2/posts");

    return {
      props: { articles: res.data } // will be passed to the page component as props
    };
  } catch (error) {}
}
