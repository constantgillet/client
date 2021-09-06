import { Col, message } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { addFavorite, removeFavorite } from "../redux/actions/favoriteActions";
import { MainStyle } from "../styles/style";
import Image from "next/image";
import { API_IMAGES_PATH } from "../lib/constants";
import { toReadablePrice } from "../helpers/textHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faMapMarkerAlt, faHeart as faHeartFavorite } from "@fortawesome/fontawesome-free-solid";
import { faHeart as FaHeartNotFavorite } from "@fortawesome/fontawesome-free-regular";
import { useSession } from "next-auth/client";
import FavoriteAPI from "../lib/API/favoritesAPI";

const OfferLink = styled.a`
  background: white;
  border-radius: ${MainStyle.radius.m}px;
  border: ${MainStyle.card.border};
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  transition: all 0.2s ease-in-out;

  &:hover {
    filter: drop-shadow(0px 5px 14px rgba(0, 0, 0, 0.1));
    cursor: pointer;
    text-decoration: none;
  }
`;

const CardHead = styled.div`
  position: relative;
`;

const CardBody = styled.div`
  padding: ${MainStyle.space.s}px;
`;

const OfferImage = styled(Image)`
  border-bottom: ${MainStyle.card.border} !important;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  width: 100%;
  height: auto;
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

const ImagesCount = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
  background: rgba(0, 0, 0, 0.67);
  border-radius: 30px;
  font-size: 12px;
  padding: 2px 8px;
  color: #fff;

  svg {
    margin-right: 4px;
    width: auto;
  }
`;

const OfferTitle = styled.span`
  display: block;
  color: ${MainStyle.color.dark};
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  text-align: left;
`;

const OfferPrice = styled.span`
  display: block;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: ${MainStyle.color.primary};
  margin-top: ${MainStyle.space.xs}px;
`;

const OfferLocation = styled.span`
  font-size: 13px;
  color: ${MainStyle.color.dark40};

  svg {
    padding-right: 6px;
    font-size: 13px;
    width: auto !important;
  }
`;

const OfferCard = ({ className, children, offer, favorites, addFavorite, removeFavorite }) => {
  const [session, loading] = useSession();

  const isFavorite = favorites.includes(offer.id);

  const [isPosting, setIsPosting] = useState(false);

  const onClickFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (session && !loading) {
      if (!isPosting) {
        setIsPosting(true);

        if (!isFavorite) {
          addFavorite(offer.id);

          new FavoriteAPI()
            .create(offer.id)
            .then(() => {
              setIsPosting(false);
            })
            .catch((err) => {
              setIsPosting(false);
              removeFavorite(offer.id);
              message.error("Erreur lors de l'ajout aux favoris");
            });
        } else {
          removeFavorite(offer.id);
          new FavoriteAPI()
            .delete(offer.id)
            .then(() => {
              setIsPosting(false);
            })
            .catch(() => {
              setIsPosting(false);
              message.error("Erreur lors de la suppression du favori");
            });
        }
      }
    } else {
      message.error("Vous devez être connecté(e)");
    }
  };

  return (
    <Link href={`/offres/${offer.category}/${offer.id}`}>
      <OfferLink title={offer.title}>
        <CardHead>
          <OfferImage
            src={API_IMAGES_PATH + "min-" + offer.images[0]}
            width={236}
            height={236}
            layout="responsive"
          />
          <ImagesCount>
            <FontAwesomeIcon icon={faCamera} /> {offer.images.length}
          </ImagesCount>
          <FavoriteButton onClick={onClickFavorite}>
            <FontAwesomeIcon icon={isFavorite ? faHeartFavorite : FaHeartNotFavorite} />
          </FavoriteButton>
        </CardHead>
        <CardBody>
          <OfferTitle> {offer.title} </OfferTitle>
          <OfferPrice> {toReadablePrice(offer.price)} </OfferPrice>
          <OfferLocation>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> {offer.city} ({offer.department})
          </OfferLocation>
        </CardBody>
      </OfferLink>
    </Link>
  );
};

const mapState = (state) => {
  return {
    favorites: state.favorite.favorites
  };
};

const mapDis = {
  addFavorite: addFavorite,
  removeFavorite: removeFavorite
};

export default connect(mapState, mapDis)(OfferCard);
