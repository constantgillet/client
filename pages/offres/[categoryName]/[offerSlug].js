import { Breadcrumb, Col, Row } from "antd";
import React from "react";
import Container from "../../../components/Container";
import Main from "../../../components/Main";
import Link from "next/link";
import styled from "styled-components";
import { MainStyle } from "../../../styles/style";
import { getOneOffer } from "../../../lib/API/offferAPI";
import { getOneUser } from "../../../lib/API/userAPI";

const BreadcrumbElement = styled(Breadcrumb)`
  padding-top: ${MainStyle.space.m}px;
  padding-bottom: ${MainStyle.space.m}px;
`;

export default function OffersList({ pageProps }) {
  const { offer, offerUser } = pageProps;

  return (
    <Main>
      <Container>
        <BreadcrumbElement>
          <Breadcrumb.Item>
            <Link href="/offres">Annonces</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href={"/offres/" + offer.category}>{offer.category}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{offer.title}</Breadcrumb.Item>
        </BreadcrumbElement>
        <Row gutter={MainStyle.gutter}>
          <Col md={16}>col 1</Col>
          <Col md={8}>
            <ContactAside>col 2</ContactAside>
          </Col>
        </Row>
      </Container>
    </Main>
  );
}

export async function getServerSideProps({ params, res }) {
  const { offerSlug } = params;
  const offerSlugSplited = offerSlug.split("-");

  try {
    const resp = await getOneOffer(offerSlugSplited[0]);
    const respUser = await getOneUser(resp.data.data.user_id);

    // will be passed to the page component as props
    return {
      props: {
        pageProps: { offer: resp.data.data, offerUser: respUser.data.data }
      }
    };
  } catch (error) {
    res.statusCode = 404;
    return {
      props: { myStatusCode: 404, error: `couldn't find the offer` } // will be passed to the page component as props
    };
  }
}

const ContactAsideElement = styled.aside`
  position: sticky;
  top: 149px;
  background: white;
  border-radius: ${MainStyle.radius.m}px;
`;

const AsideHeader = styled.div`
  padding: ${MainStyle.space.l}px;
`;

export function ContactAside({ children }) {
  return (
    <ContactAsideElement>
      <AsideHeader>{children}</AsideHeader>
    </ContactAsideElement>
  );
}
