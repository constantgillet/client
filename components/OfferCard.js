import { Col } from "antd";
import Link from "next/link";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { addFavorite, removeFavorite } from "../redux/actions/favoriteActions";
import { MainStyle } from "../styles/style";
import Image from "next/image";
import { API_IMAGES_PATH } from "../lib/constants";
import { toReadablePrice } from "../helpers/textHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faMapMarkerAlt } from "@fortawesome/fontawesome-free-solid";

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
  return (
    <Col sm={12} lg={8}>
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
    </Col>
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
