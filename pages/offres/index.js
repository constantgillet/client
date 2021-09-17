import React, { useState } from "react";
import Main from "../../components/Main";
import Container from "../../components/Container";
import { Col, Row } from "antd";
import { MainStyle } from "../../styles/style";
import styled from "styled-components";
import Meta from "../../components/Meta";
import OfferAPI from "../../lib/API/offerAPI";
import OfferCard from "../../components/OfferCard";
import SearchFilters from "../../components/SearchFilters";
import Pagination from "../../components/Pagination";
import { useRouter } from "next/dist/client/router";

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

const PaginationContainer = styled.div`
  text-align: center;
`;

export default function OfferSearchPage({ offers }) {
  const router = useRouter();

  const [page, setPage] = useState(parseInt(router?.query?.page) || 1);
  const [pageSize, setPageSize] = useState(router?.query?.size || 9);

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
              <PaginationContainer>
                <Pagination
                  showSizeChanger
                  pageSize={router?.query?.size ? router?.query?.size : 10}
                  current={page}
                  total={500}
                  pageSize={pageSize}
                  onChange={(newPage, newPageSize) => {
                    setPage(newPage);
                    setPageSize(newPageSize);

                    const params = {
                      pathname: window.location.pathname,
                      query: { ...router.query, page: newPage, size: newPageSize }
                    };

                    delete params.query?.categoryName;
                    router.push(params);
                  }}
                  pageSizeOptions={[9, 18, 45, 90]}
                />
              </PaginationContainer>
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
      limit: query?.size ? query?.size : 9,
      page: query?.page ? query?.page : 1,
      departments: departments,
      category: query?.categoryName
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
