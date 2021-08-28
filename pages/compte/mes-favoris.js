import { getSession } from "next-auth/client";
import Main from "../../components/Main";
import FavoriteAPI from "../../lib/API/favoritesAPI";
import OfferAPI from "../../lib/API/offerAPI";
import Meta from "../../components/Meta";
import Container from "../../components/Container";
import ProfileLayout from "../../components/ProfileLayout";
import styled from "styled-components";
import { MainStyle } from "../../styles/style";
import OfferCard from "../../components/OfferCard";
import { Row } from "antd";

const CardSection = styled.section`
  background: white;
  padding: ${MainStyle.space.l}px;
  border-radius: ${MainStyle.radius.m}px;
  border: ${MainStyle.card.border};
`;

const CardTitle = styled.h1`
  font-size: ${MainStyle.text.title.fontSize};
  font-weight: ${MainStyle.text.title.fontWeight};
`;

const RowElement = styled(Row)`
  & > div {
    padding-top: ${MainStyle.space.m}px;
    padding-bottom: ${MainStyle.space.m}px;
  }
`;
export default function MyFavorites({ offers }) {
  return (
    <Main>
      <Meta title="Mes favoris" description="Retrouvez vos annonces d'airsoft favorites sur cette page" />
      <Container>
        <ProfileLayout>
          <CardSection>
            <CardTitle>Mes favoris</CardTitle>
            <p>
              Sélectionnez vos annonces favorites et retrouvez les. Sauvegardez autant d'annonces que vous le
              souhaitez.
            </p>
            <RowElement gutter={MainStyle.gutter}>
              {offers?.map((offer, index) => (
                <OfferCard key={index} offer={offer} />
              ))}
            </RowElement>
          </CardSection>
        </ProfileLayout>
      </Container>
    </Main>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  try {
    const resp = await new FavoriteAPI(context).getAll(session.user.id);
    let favorites = resp.data.data;

    let offers = [];

    if (favorites) {
      const respOffers = await new OfferAPI().getAllOffer({ offersId: favorites });

      if (respOffers.data.data) {
        offers = respOffers.data.data;
      }
    }

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
