import React from "react";
import Main from "../../components/Main";
import Container from "../../components/Container";
import { Col, Row } from "antd";
import { MainStyle } from "../../styles/style";
import styled from "styled-components";
import Meta from "../../components/Meta";
import OfferAPI from "../../lib/API/offerAPI";
import OfferCard from "../../components/OfferCard";
import SearchFilters from "../../components/SearchFilters";

const MainElement = styled(Main)`
  padding-top: ${MainStyle.space.l}px;
  padding-bottom: ${MainStyle.space.l}px;
`;

const HeaderCard = styled.div`
  padding: 84px;
  background: linear-gradient(0deg, rgba(20, 108, 218, 0.3), rgba(20, 108, 218, 0.3)),
    url(/images/backgrounds/register_background.jpg) center;
  background-size: cover;
  color: #f8f9fa;
  border-radius: ${MainStyle.radius.m}px;
  margin-bottom: ${MainStyle.space.m}px;

  h1 {
    text-align: center;
    font-size: ${MainStyle.text.title.fontSize};
    font-weight: ${MainStyle.text.title.fontWeight};
    color: ${MainStyle.color.light};
  }
`;

const CardCol = styled(Col)`
  padding-top: ${MainStyle.space.s}px;
  padding-bottom: ${MainStyle.space.m}px;
`;

export default function OfferSearchPage({ offers }) {
  return (
    <>
      <Meta title="Rechercher une annonce | upgear" />
      <MainElement>
        <Container>
          <Row gutter={MainStyle.gutter}>
            <Col span={24} lg={6}>
              <SearchFilters />
            </Col>
            <Col span={24} lg={18}>
              <HeaderCard>
                <h1>Recherche</h1>
              </HeaderCard>
              <Row gutter={MainStyle.gutter}>
                {offers?.map((offer, index) => (
                  <CardCol key={index} span={24} sm={12} lg={8}>
                    <OfferCard offer={offer} />
                  </CardCol>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </MainElement>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query, res } = context;

  let departments = null;
  if (query.departement) {
    if (Array.isArray(query.departement)) {
      departments = query.departement;
    } else {
      departments = [query.departement];
    }
  }

  try {
    const resp = await new OfferAPI().getAllOffer({
      limit: 9,
      departments: departments
    });
    const offers = resp.data.data;

    return {
      props: {
        offers: offers
      }
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        offers: []
      }
    };
  }
}
