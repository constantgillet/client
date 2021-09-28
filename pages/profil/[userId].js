import { Col, Row } from "antd";
import React from "react";
import styled from "styled-components";
import Container from "../../components/Container";
import Main from "../../components/Main";
import Meta from "../../components/Meta";
import OfferCard from "../../components/OfferCard";
import ProfileBanner from "../../components/ProfileBanner";
import OfferAPI from "../../lib/api/offerAPI";
import UserAPI from "../../lib/api/userAPI";
import { API_IMAGES_PATH } from "../../lib/constants";
import { MainStyle } from "../../styles/style";
import Card from "../../components/Card";
import Input from "../../components/Input";

const ContainerElement = styled(Container)`
  padding-top: ${MainStyle.space.l}px;
  padding-bottom: ${MainStyle.space.l}px;
`;

const ColCard = styled(Col)`
  padding-top: ${MainStyle.space.m}px;
  padding-bottom: ${MainStyle.space.m}px;
`;

const SubTitle = styled.h2`
  font-size: ${MainStyle.text.subtitle.fontSize};
  font-weight: ${MainStyle.text.subtitle.fontWeight};
`;

const ProfileInfosBlock = styled(Card)`
  padding: ${MainStyle.space.l}px;
  margin-top: ${MainStyle.space.l}px;
  margin-bottom: ${MainStyle.space.l}px;
`;

const ProfileInfosTitle = styled.h1`
  font-size: ${MainStyle.text.title.fontSize};
  font-weight: ${MainStyle.text.title.fontWeight};
`;

const LabelInfo = styled.span`
  font-weight: 700;
`;

const ProfileInfo = styled.p`
  margin-bottom: ${MainStyle.space.l}px;
`;

export default function ProfilePage({ offers, user }) {
  return (
    <Main>
      <Meta title={"Profil de " + user.username + " | Upgear airsoft"} />
      <ContainerElement>
        <ProfileBanner
          profilePicture={user?.profile_picture?.length ? API_IMAGES_PATH + user?.profile_picture : null}
          bannerPicture={user?.banner_picture?.length ? API_IMAGES_PATH + user?.banner_picture : null}
        />
        <Row gutter={MainStyle.gutter}>
          <Col span={24} md={18}>
            <ProfileInfosBlock>
              <ProfileInfosTitle>{"Profil de " + user.username}</ProfileInfosTitle>
              <Row gutter={MainStyle.gutter}>
                <Col span={24} md={12}>
                  <LabelInfo>Team:</LabelInfo>
                  <ProfileInfo>
                    {user?.team_name?.length
                      ? user?.team_name
                      : "Cet utilisateur n'est pas dans une équipe / team."}
                  </ProfileInfo>
                  <LabelInfo>Localisation:</LabelInfo>
                  <ProfileInfo>
                    {user?.location?.length
                      ? user?.location
                      : "Cet utilisateur n'a pas mis de de localisation."}
                  </ProfileInfo>
                </Col>
                <Col span={24} md={12}>
                  <LabelInfo>Date de création du compte:</LabelInfo>
                  <ProfileInfo>Cet utilisateur n'est pas dans une équipe / team.</ProfileInfo>
                </Col>
              </Row>
              <LabelInfo>Description:</LabelInfo>
              <ProfileInfo>
                {user?.description?.length
                  ? user?.description
                  : "Cet utilisateur n'a pas mis de description."}
              </ProfileInfo>
            </ProfileInfosBlock>
          </Col>
          <Col span={12} md={6}>
            <ProfileInfosBlock>
              <SubTitle>Avis</SubTitle>
              <ProfileInfo>Les avis ne sont pas disponnibles pour le moment.</ProfileInfo>
            </ProfileInfosBlock>
          </Col>
        </Row>
        <SubTitle>Annonces du vendeur</SubTitle>
        <Row gutter={MainStyle.gutter}>
          {offers.map((offer, index) => (
            <ColCard key={index} span={12} lg={6}>
              <OfferCard offer={offer} />
            </ColCard>
          ))}
        </Row>
      </ContainerElement>
    </Main>
  );
}

export async function getServerSideProps({ params, res }) {
  const { userId } = params;

  try {
    const respUser = await new UserAPI().getOneUser(userId);
    const respOffers = await new OfferAPI().getAllOffer({ userId: userId });

    // will be passed to the page component as props
    return {
      props: {
        offers: respOffers.data.data.offers,
        user: respUser.data.data
      }
    };
  } catch (error) {
    res.statusCode = 404;
    return {
      props: { myStatusCode: 404, error: `couldn't find the offer` } // will be passed to the page component as props
    };
  }
}
