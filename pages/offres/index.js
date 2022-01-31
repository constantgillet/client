import React, { useEffect, useState } from "react";
import Main from "../../components/Main";
import Container from "../../components/Container";
import { Col, Row } from "antd";
import { MainStyle } from "../../styles/style";
import styled from "styled-components";
import Meta from "../../components/Meta";
import OfferAPI from "../../lib/api/offerAPI";
import OfferCard from "../../components/OfferCard";
import SearchFilters from "../../components/SearchFilters";
import Pagination from "../../components/Pagination";
import { useRouter } from "next/dist/client/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/fontawesome-free-regular";
import Select from "../../components/Select";

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

const TopPageGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${MainStyle.space.s}px;
`;

const TopPagination = styled(Pagination)`
  & .ant-pagination-simple-pager input {
    border-radius: ${MainStyle.radius.s}px;
  }
`;

const OrderByText = styled.span`
  margin-right: ${MainStyle.space.s}px;

  @media (max-width: ${MainStyle.breakpoint.md}px) {
    display: none;
  }
`;

export default function OfferSearchPage({ offers }) {
  const router = useRouter();

  const [page, setPage] = useState(parseInt(router?.query?.page) || 1);
  const [pageSize, setPageSize] = useState(router?.query?.size || 12);
  const [orderBy, setOrderBy] = useState(router?.query?.orderBy || "id_desc");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [router.pathname, router.query]);

  return (
    <>
      <Meta title="Rechercher une annonce | upgear" />
      <MainElement>
        <Container>
          <Row gutter={MainStyle.gutter}>
            <Col span={24} lg={6}>
              <SearchFilters setSearchPageLoading={setLoading} />
            </Col>
            <Col span={24} lg={18}>
              <HeaderCard>
                <h1>Recherche</h1>
              </HeaderCard>
              <TopPageGroup>
                <div>
                  <OrderByText>Trier par:</OrderByText>
                  <Select
                    value={orderBy}
                    onChange={(newOrderBy) => {
                      const params = {
                        pathname: window.location.pathname,
                        query: { ...router.query, page: 1, orderBy: newOrderBy }
                      };

                      setPage(1);
                      setOrderBy(newOrderBy);
                      router.push(params);

                      setLoading(true);
                    }}
                  >
                    <Select.Option value={"id_desc"}>Plus récentes</Select.Option>
                    <Select.Option value={"id_asc"}>Plus vielles</Select.Option>
                    <Select.Option value={"price_asc"}>Moins chères</Select.Option>
                    <Select.Option value={"price_desc"}>Plus chères</Select.Option>
                    <Select.Option value={"views_desc"}>Plus vues</Select.Option>
                    <Select.Option value={"views_asc"}>Moins vues</Select.Option>
                  </Select>
                </div>
                <TopPagination
                  current={page}
                  total={offers?.total}
                  onChange={(newPage, newPageSize) => {
                    setPage(newPage);
                    setPageSize(newPageSize);

                    const params = {
                      pathname: window.location.pathname,
                      query: { ...router.query, page: newPage, size: newPageSize }
                    };

                    delete params.query?.categoryName;
                    router.push(params);

                    setLoading(true);
                  }}
                  showSizeChanger={false}
                  //size={"small"}
                  simple
                />
              </TopPageGroup>
              <Row gutter={MainStyle.gutter}>
                {offers?.offers?.length ? (
                  offers?.offers?.map((offer, index) => (
                    <CardCol key={index} span={24} sm={12} lg={8}>
                      <OfferCard offer={offer} loading={loading} />
                    </CardCol>
                  ))
                ) : (
                  <NoOffersBlock />
                )}
              </Row>
              <PaginationContainer>
                <Pagination
                  showSizeChanger
                  current={page}
                  total={offers?.total}
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

                    setLoading(true);
                  }}
                  pageSizeOptions={[12, 18, 45, 90]}
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
      limit: query?.size ? query?.size : 12,
      page: query?.page ? query?.page : 1,
      departments: departments,
      category: query?.categoryName,
      query: query?.q,
      orderBy: query?.orderBy || "id_desc"
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

const NoOffersBlockElement = styled(Col)`
  background-color: ${MainStyle.color.primary80};
  border-radius: ${MainStyle.radius.m}px;
  padding: ${MainStyle.space.l}px;
  margin-bottom: ${MainStyle.space.l}px;
  text-align: center;
  color: white;

  svg {
    font-size: 60px;
    margin-bottom: 24px;
  }

  h2 {
    font-size: ${MainStyle.text.subtitle.fontSize};
    font-weight: ${MainStyle.text.subtitle.fontWeight};
    color: white;
    margin-bottom: 16px;
  }
`;

const NoOffersBlock = () => {
  return (
    <Col span={24}>
      <NoOffersBlockElement>
        <FontAwesomeIcon icon={faQuestionCircle} />
        <h2>Aucun résultat trouvé</h2>
        <p>Aucun résultat a été trouvé, Changez ou supprimez les filtres pour afficher des annonces</p>
      </NoOffersBlockElement>
    </Col>
  );
};
