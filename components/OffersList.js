import Link from "next/link";
import Image from "next/image";
import { lighten } from "polished";
import styled from "styled-components";
import { MainStyle } from "../styles/style";
import Card from "./Card";
import Col from "./Col";
import { message, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartFavorite, faMapMarkerAlt } from "@fortawesome/fontawesome-free-solid";
import { toReadablePrice } from "../lib/textFunctions";
import { API_IMAGES_PATH, API_URL } from "../lib/constants";
import { faHeart as FaHeartNotFavorite } from "@fortawesome/fontawesome-free-regular";
import { useState } from "react";
import { connect } from "react-redux";
import { useSession } from "next-auth/client";
import { addFavorite, removeFavorite } from "../redux/actions/favoriteActions";
import FavoriteAPI from "../lib/api/favoritesAPI";

const AnnoncesListElement = styled(Card)`
  padding: ${MainStyle.space.l}px;
`;

const BlockHeader = styled.header`
  display: flex;
  justify-content: space-between;
`;

const BlockTitle = styled.h2`
  font-size: ${MainStyle.text.subtitle.fontSize};
  font-weight: ${MainStyle.text.subtitle.fontWeight};
  margin-bottom: ${MainStyle.space.s}px;
`;

const SeeMoreLink = styled.a`
  font-size: ${MainStyle.text.small.fontSize};
  text-transform: uppercase;
  color: ${MainStyle.color.dark80};

  &:hover {
    text-decoration: underline;
    color: ${MainStyle.color.dark};
  }
`;

export default function OffersList({ className, children, offers, title, seeMoreLink }) {
  return (
    <AnnoncesListElement className={className}>
      <BlockHeader>
        <BlockTitle>{title}</BlockTitle>
        <Link href={seeMoreLink ? seeMoreLink : "/offres"}>
          <SeeMoreLink title="Voir plus"> Voir plus </SeeMoreLink>
        </Link>
      </BlockHeader>
      <main>
        <Row>{offers ? offers.map((offer, index) => <AnnonceCard key={index} offer={offer} />) : null}</Row>
      </main>
    </AnnoncesListElement>
  );
}

const AnnonceCardHeader = styled.div`
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #146cda;
    z-index: 1;
    opacity: 0.04;
    border-radius: 4px;
    pointer-events: none;
  }
`;

const AnnonceLink = styled.a`
  padding: 15px;
  display: block;
  border-radius: ${MainStyle.radius.m}px;
  transition: all 0.2s ease-in-out;

  &:hover {
    text-decoration: none;
    box-shadow: 1px 2px 4px rgb(0 0 0 / 7%), -3px -3px 9px rgb(0 0 0 / 6%);
  }
`;

const AnnonceImage = styled(Image)`
  width: 100%;
  height: auto;
  border-radius: ${MainStyle.radius.s}px;

  img {
    width: 100%;
    height: auto;
  }
`;

const FavoriteButton = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 42px;
  height: 42px;
  cursor: pointer;

  svg {
    position: absolute;
    color: ${MainStyle.color.primary};
    font-size: 24px;
    top: 8px;
    right: 8px;
  }
`;

const AnnonceTitle = styled.h3`
  font-size: ${MainStyle.text.bodyBold.fontSize};
  font-weight: ${MainStyle.text.bodyBold.fontWeight};
  color: ${MainStyle.color.dark};
  margin-top: ${MainStyle.space.xs}px;
  margin-bottom: ${MainStyle.space.xs}px;
`;

const AnnonceInfos = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AnnoncePrice = styled.span`
  font-size: ${MainStyle.text.bodyBold.fontSize};
  font-weight: ${MainStyle.text.bodyBold.fontWeight};
  color: ${MainStyle.color.primary};
`;

const AnnonceLocation = styled.span`
  font-size: ${MainStyle.text.small.fontSize};
  font-weight: ${MainStyle.text.small.fontWeight};
  color: ${MainStyle.color.dark60};
`;

const mapState = (state) => {
  return {
    favorites: state.favorite.favorites
  };
};

const mapDis = {
  addFavorite: addFavorite,
  removeFavorite: removeFavorite
};

const AnnonceCard = connect(
  mapState,
  mapDis
)(({ className, children, offer, favorites, addFavorite, removeFavorite }) => {
  const [session, loading] = useSession();

  const isFavorite = favorites.includes(offer.id);

  const [isPosting, setIsPosting] = useState(false);

  const onClickFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (session && !loading) {
      if (!isFavorite) {
        try {
          addFavorite(offer.id);
        } catch (error) {
          message.error("Erreur lors de l'ajout aux favoris");
        }
      } else {
        try {
          removeFavorite(offer.id);
        } catch (error) {
          message.error("Erreur lors de la suppression du favori");
        }
      }
    } else {
      message.error("Vous devez être connecté(e)");
    }
  };

  return (
    <Col sm={6} md={3} noPadding>
      <Link href={`/offres/${offer.category}/${offer.id}`}>
        <AnnonceLink title={offer.title}>
          <AnnonceCardHeader>
            <AnnonceImage
              src={API_IMAGES_PATH + "min-" + offer.images[0]}
              width={243}
              height={243}
              layout="responsive"
              alt={"photo de " + offer.title}
            />
            <FavoriteButton onClick={onClickFavorite}>
              <FontAwesomeIcon icon={isFavorite ? faHeartFavorite : FaHeartNotFavorite} />
            </FavoriteButton>
          </AnnonceCardHeader>
          <div>
            <AnnonceTitle>{offer.title}</AnnonceTitle>
            <AnnonceInfos>
              <AnnoncePrice>{toReadablePrice(offer.price)}</AnnoncePrice>
              <AnnonceLocation>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> {offer.city}
              </AnnonceLocation>
            </AnnonceInfos>
          </div>
        </AnnonceLink>
      </Link>
    </Col>
  );
});
