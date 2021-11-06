import { Breadcrumb, Carousel, Col, message, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Container from "../../../components/Container";
import Main from "../../../components/Main";
import Link from "next/link";
import styled, { css } from "styled-components";
import { MainStyle } from "../../../styles/style";
import UserAPI from "../../../lib/api/userAPI";
import { API_IMAGES_PATH, API_URL } from "../../../lib/constants";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faFlag,
  faHeart as FaHeartNotFavorite,
  faImage,
  faLifeRing,
  faUser
} from "@fortawesome/fontawesome-free-regular";
import {
  faArrowRight,
  faChevronLeft,
  faChevronRight,
  faExpand,
  faLock,
  faUserShield,
  faHeart as faHeartFavorite
} from "@fortawesome/fontawesome-free-solid";
import ContactAside from "../../../components/ContactAside";
import { toReadablePrice } from "../../../helpers/textHelpers";
import Separator from "../../../components/Separator";
import MapBlock from "../../../components/MapBlock";
import Head from "next/head";
import Meta from "../../../components/Meta";
import { connect } from "react-redux";
import Modal from "../../../components/Modal";
import { addFavorite, removeFavorite, setFavorites } from "../../../redux/actions/favoriteActions";
import { useSession } from "next-auth/client";
import FavoriteAPI from "../../../lib/api/favoritesAPI";
import OfferAPI from "../../../lib/api/offerAPI";
import ShippingCategoryAPI from "../../../lib/api/shippingCategoryAPI";

const BreadcrumbElement = styled(Breadcrumb)`
  padding-top: ${MainStyle.space.m}px;
  padding-bottom: ${MainStyle.space.m}px;
`;

const OfferImage = styled(Image)`
  border-radius: ${MainStyle.radius.m}px;
  width: 100% !important;
  height: auto !important;
`;

const CarouselContainer = styled.div`
  position: relative;
`;

const ButtonPrevious = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  z-index: 2;
  transform: translateY(-50%);
  padding: 12px;
  cursor: pointer;
  color: #10233a;
  transition: all 0.15s ease-in-out;
  left: 12px;
  width: 46px !important;
  height: 46px;

  &:hover {
    width: 52px !important;
    height: 52px;
  }
`;

const ButtonNext = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  z-index: 2;
  transform: translateY(-50%);
  padding: 12px;
  cursor: pointer;
  color: #10233a;
  transition: all 0.15s ease-in-out;
  right: 12px;
  width: 46px !important;
  height: 46px;

  &:hover {
    width: 52px !important;
    height: 52px;
  }
`;

const ImagesPreviewBox = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
  align-self: flex-start;
  justify-content: space-between;
  height: 100%;

  @media (max-width: ${MainStyle.breakpoint.lg}px) {
    display: none;
  }
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 116px;
  background-position: center;
  background-size: cover;
  border-radius: ${MainStyle.radius.m}px;
  border: 1.5px solid #f2f3f7;
  cursor: pointer;
`;

const ImagePreviewEmpty = styled.div`
  width: 100%;
  height: 116px;
  background: #f1f6fc;
  border-radius: ${MainStyle.radius.m}px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a1c4f0;
  font-size: 28px;
`;

const ImagePreviewSeeMoreElement = styled.div`
  position: relative;
  width: 100%;
  height: 116px;
  border-radius: ${MainStyle.radius.m}px;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;

  svg {
    margin-right: 4px;
  }

  &:hover {
    .overlay {
      opacity: 0.7;
    }
  }
  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.4;
    border-radius: ${MainStyle.radius.m}px;
    transition: opacity 0.15s ease-out;
  }
`;

const OfferSection = styled.section`
  background: white;
  border: ${MainStyle.card.border};
  border-radius: ${MainStyle.radius.m}px;
  margin-top: ${MainStyle.space.l}px;
  margin-bottom: ${MainStyle.space.l}px;
  padding: ${MainStyle.space.l}px;
`;

const OfferTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const OfferTitle = styled.h1`
  font-size: ${MainStyle.text.title.fontSize};
  font-weight: ${MainStyle.text.title.fontWeight};
  line-height: 28px;
`;

const IconFavorite = styled(FontAwesomeIcon)`
  font-size: 24px;
  color: ${MainStyle.color.primary};
  cursor: pointer;
`;

const OfferPrice = styled.div`
  color: ${MainStyle.color.primary};
  font-size: 24px;
  font-weight: 600;
`;

const OfferCreationDate = styled.span`
  font-size: ${MainStyle.text.small.fontSize};
  font-weight: 600;
`;

const PartSeparator = styled(Separator)`
  margin: ${MainStyle.space.l}px auto;
`;

const OfferPartTitle = styled.h2`
  font-size: ${MainStyle.text.subtitle.fontSize};
  font-weight: ${MainStyle.text.subtitle.fontWeight};
`;

const OfferDescription = styled.p`
  white-space: pre-line;
  line-break: anywhere;
`;

const LocationItem = styled.p`
  margin: ${MainStyle.space.s}px auto;
`;

const LocationItemTitle = styled.span`
  font-weight: bold;
`;

const SellerProfileLink = styled.a`
  & > div {
    vertical-align: middle;
  }
`;

const SellerProfilePicture = styled(Image)`
  border-radius: 50%;
  vertical-align: middle;
`;

const SellerUsername = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: ${MainStyle.color.dark};
  margin-left: 8px;
`;

const SellerInfoItem = styled.p`
  margin: ${MainStyle.space.s}px auto;

  svg {
    margin-right: ${MainStyle.space.s}px;
  }
`;

const ReportOffer = styled.p`
  margin: ${MainStyle.space.s}px auto;
  cursor: pointer;

  svg {
    font-size: 12px;
  }

  &:hover {
    text-decoration: underline;
  }
`;

function ImagePreviewSeeMore({ imageSrc, onClick }) {
  return (
    <ImagePreviewSeeMoreElement style={{ backgroundImage: `url(\'${imageSrc}\')` }} onClick={onClick}>
      <div style={{ zIndex: 1 }}>
        <FontAwesomeIcon icon={faExpand} />
        Afficher les photos
      </div>
      <div className="overlay"></div>
    </ImagePreviewSeeMoreElement>
  );
}

function ShippingMethod({ type, price, text }) {
  return (
    <ShippingMethodElement>
      <ShippingMethodContainer>
        <ShippingIcon type={type} />
        <Separator />
        <ShippingPrice>{toReadablePrice(price)}</ShippingPrice>
      </ShippingMethodContainer>
      <ShippingInfos>{text}</ShippingInfos>
    </ShippingMethodElement>
  );
}

const ShippingMethodElement = styled.div`
  margin: ${MainStyle.space.m}px auto;

  hr {
    flex-grow: 1;
    margin: 0px 12px;
  }
`;

const ShippingMethodContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ShippingIcon = styled.i`
  display: block;
  background-position: center;
  background-size: cover;

  ${({ type }) =>
    type == "colissimo"
      ? css`
          height: 26px;
          width: 101px;
          background-image: url(/images/logo/colissimo.png);
        `
      : type == "mondial-relay"
      ? css`
          width: 26px;
          height: 26px;
          background-image: url(/images/logo/mondial_relay.png);
        `
      : type == "chronopost"
      ? css`
          width: 96px;
          height: 26px;
          background-image: url(/images/logo/chronopost_logo.jpg);
        `
      : null}
`;

const ShippingPrice = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${MainStyle.color.primary};
`;

const ShippingInfos = styled.p`
  font-size: 12px;
  color: ${MainStyle.color.dark60};
`;

function OfferPage({ pageProps, categories, favorites, addFavorite, removeFavorite }) {
  const { offer, shippingCategory } = pageProps;

  const creationDate = new Date(offer.creation_date);
  const offerUserCreationDate = new Date(offer?.user.creation_date);
  const offerUserLastLogin = new Date(offer?.user.last_login);

  const carousel = useRef(null);

  //get category
  let category;

  categories.map((_category) => {
    return _category.subcategories?.find((subcategory) => {
      if (subcategory.name === offer.category) {
        category = subcategory;
      }
      return false;
    });
  })[0];

  const [session, loading] = useSession();

  const isFavorite = favorites.includes(offer.id);

  const [isPosting, setIsPosting] = useState(false);

  //Change user picture
  if (offer?.user && offer?.user?.profile_picture?.length) {
    offer.user.profile_picture = API_IMAGES_PATH + offer?.user.profile_picture;
  }

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
    <Main>
      <Meta
        title={offer.title + " | Annonce airsoft"}
        description={offer.description}
        image={API_IMAGES_PATH + "min-" + offer.images[0].src}
      />
      <Container>
        <BreadcrumbElement>
          <Breadcrumb.Item>
            <Link href="/offres">Annonces</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href={"/offres/" + offer.category}>{category ? category.label : ""}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{offer.title}</Breadcrumb.Item>
        </BreadcrumbElement>
        <Row gutter={MainStyle.gutter}>
          <Col span={24} lg={16}>
            <Row gutter={MainStyle.gutter}>
              <Col span={24} lg={18}>
                <CarouselContainer>
                  <Carousel ref={carousel}>
                    {offer.images.map((image, index) => (
                      <OfferImage key={index} src={API_IMAGES_PATH + image.src} width={540} height={400} />
                    ))}
                  </Carousel>
                  <ButtonPrevious icon={faChevronLeft} onClick={() => carousel.current.prev()} />
                  <ButtonNext icon={faChevronRight} size="2x" onClick={() => carousel.current.next()} />
                </CarouselContainer>
              </Col>
              <Col span={24} lg={6}>
                <ImagesPreviewBox>
                  <ImagePreview
                    style={{ backgroundImage: `url(\'${API_IMAGES_PATH + "min-" + offer.images[0].src}\')` }}
                  />
                  {offer.images.length > 1 ? (
                    <ImagePreview
                      style={{
                        backgroundImage: `url(\'${API_IMAGES_PATH + "min-" + offer.images[1].src}\')`
                      }}
                    />
                  ) : (
                    <ImagePreviewEmpty>
                      <FontAwesomeIcon icon={faImage} />
                    </ImagePreviewEmpty>
                  )}
                  <ImagePreviewSeeMore
                    imageSrc={API_IMAGES_PATH + "min-" + offer.images[0].src}
                    onClick={() => message.info("Cette fonctionnalité n'est pas encore disponnible")}
                  />
                </ImagesPreviewBox>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <ContactAside offer={offer} offerUser={offer?.user} isMobile />
              </Col>
            </Row>
            <OfferSection>
              <OfferTitleContainer>
                <OfferTitle>{offer.title}</OfferTitle>
                <IconFavorite
                  icon={isFavorite ? faHeartFavorite : FaHeartNotFavorite}
                  onClick={onClickFavorite}
                />
              </OfferTitleContainer>
              <OfferPrice>{toReadablePrice(offer.price)}</OfferPrice>
              <OfferCreationDate>
                Ajouté le{" "}
                {creationDate.toLocaleString("fr-FR", {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                })}{" "}
                à {creationDate.toLocaleString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
              </OfferCreationDate>
              <PartSeparator />
              <OfferPartTitle> Description : </OfferPartTitle>
              <OfferDescription>{offer.description}</OfferDescription>
              <PartSeparator />

              <OfferPartTitle> Livraison : </OfferPartTitle>
              <p>Faites livrer cet équipement avec votre mode de livraison préféré.</p>
              <ShippingMethod
                type="mondial-relay"
                price={shippingCategory?.price_mondial_relay}
                text="Livré habituellement en 4-6 jours"
              />
              <ShippingMethod
                type="chronopost"
                price={shippingCategory?.price_chronopost}
                text="Livré habituellement en 2-5 jours"
              />
              <SecureBanner />
              <PartSeparator />

              <OfferPartTitle> Localisation : </OfferPartTitle>
              <LocationItem>
                <LocationItemTitle>Ville :</LocationItemTitle> {offer.city} ({offer.department})
              </LocationItem>
              <MapBlock location={offer.city} />
              <PartSeparator />

              <OfferPartTitle> Vendeur : </OfferPartTitle>
              <Link href={`/profil/${offer?.user.id}`}>
                <SellerProfileLink title="Lien du profil du vendeur">
                  <SellerProfilePicture
                    src={
                      offer?.user.profile_picture?.length
                        ? offer?.user.profile_picture
                        : "/images/profile.jpg"
                    }
                    width={58}
                    height={58}
                    alt="Photo de profil du vendeur"
                  />
                  <SellerUsername>{offer?.user.username}</SellerUsername>
                </SellerProfileLink>
              </Link>
              <SellerInfoItem>
                <FontAwesomeIcon icon={faUser} /> Membre depuis le{" "}
                {offerUserCreationDate.toLocaleString("fr-FR", {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                })}
              </SellerInfoItem>
              <SellerInfoItem>
                <FontAwesomeIcon icon={faClock} /> Dernière connexion le{" "}
                {offerUserLastLogin.toLocaleString("fr-FR", {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                })}{" "}
                à {offerUserLastLogin.toLocaleString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
              </SellerInfoItem>
              <Separator />
              <ReportOffer>
                <FontAwesomeIcon icon={faFlag} /> Signaler l'annonce
              </ReportOffer>
              <Separator />
            </OfferSection>
          </Col>
          <Col span={24} lg={8}>
            <ContactAside offer={offer} offerUser={offer?.user} />
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
    const resp = await new OfferAPI().getOneOffer(offerSlugSplited[0]);
    const respShippingCategory = await new ShippingCategoryAPI().getOneShippingCategory(
      resp.data.data.shipping_category
    );

    // will be passed to the page component as props
    return {
      props: {
        pageProps: {
          offer: resp.data.data,
          shippingCategory: respShippingCategory.data.data
        }
      }
    };
  } catch (error) {
    res.statusCode = 404;
    return {
      props: { myStatusCode: 404, error: `couldn't find the offer` } // will be passed to the page component as props
    };
  }
}

const mapState = (state) => {
  return {
    categories: state.category.categories,
    favorites: state.favorite.favorites
  };
};

const mapDis = {
  addFavorite: addFavorite,
  removeFavorite: removeFavorite
};

export default connect(mapState, mapDis)(OfferPage);

function SecureBanner() {
  const [secureBannerVisible, setSecureBannerVisible] = useState(false);

  return (
    <SecureBannerElement>
      <SecureBannerTitle>
        <FontAwesomeIcon icon={faLock} /> Achat sécurisé avec <ObvyLogo />
      </SecureBannerTitle>
      <p>
        Votre argent est conservé et le vendeur est payé lorsque vous <br /> confirmez la bonne réception du
        colis.
      </p>
      <MoreButton onClick={() => setSecureBannerVisible(true)}>
        <FontAwesomeIcon icon={faArrowRight} /> Plus d’informations sur le paiement sécurisé
      </MoreButton>
      <Modal
        title={
          <div>
            Informations sur la protecion <ObvyLogo />
          </div>
        }
        visible={secureBannerVisible}
        okText="Fermer"
        onOk={() => setSecureBannerVisible(false)}
        onCancel={() => setSecureBannerVisible(false)}
      >
        <ProtectFeatureList>
          <li className="list-element">
            <div className="illustration">
              <FontAwesomeIcon icon={faUserShield} />
            </div>
            <div>
              <div className="title">Votre achat est protégé</div>
              <div className="body text-body">
                Votre <span style={{ fontWeight: "bold" }}> argent est conservé et sucurisé </span> jusqu'à la
                bonne réception de votre colis. Une fois le colis retiré, l'acheteur dispose de 72 heures pour
                valider la transaction et payer le vendeur. Vous pouvez aussi filmer l'emballage et le
                déballage depuis Obvy pour attester que tout est en règle.{" "}
                <a title="En savoir plus sur le paiement sécurisé" target="blank" href="/paiement-securise">
                  En savoir plus.
                </a>
              </div>
            </div>
          </li>

          <li className="list-element">
            <div className="illustration">
              <FontAwesomeIcon icon={faLifeRing} />
            </div>
            <div>
              <div className="title">Une équipe de support dédiée</div>
              <div className="body text-body">
                Si vous avez besoin d'aide (perte du colis, bien endommagé, bien non conforme), vous pouvez
                contacter Obvy 7j/7, ils feront leur possible pour vous répondre dans les 24 heures et trouver
                ensemble une solution.
              </div>
            </div>
          </li>

          <li className="list-element">
            <div className="illustration">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <div>
              <div className="title">Paiements sécurisés</div>
              <div className="body text-body">
                Payer par Obvy est le seul moyen de payer de façon sécurisée et de prouver l'achat. Vos
                données ne sont pas partagées au vendeur.
              </div>
            </div>
          </li>
        </ProtectFeatureList>
      </Modal>
    </SecureBannerElement>
  );
}

const SecureBannerElement = styled.div`
  padding: ${MainStyle.space.l}px;
  background-color: ${MainStyle.color.primary20};
  border-radius: ${MainStyle.radius.s}px;

  p {
    margin-bottom: ${MainStyle.space.s}px;
  }
`;

const SecureBannerTitle = styled.h2`
  margin-bottom: ${MainStyle.space.s}px;
  font-size: 18px;
  font-weight: 600;

  svg {
    color: ${MainStyle.color.primary};
    margin-right: ${MainStyle.space.m}px;
  }
`;

const ProtectFeatureList = styled.ul`
  list-style: none;
  padding-left: 0px;

  .list-element {
    display: flex;
    margin-bottom: 24px;

    .illustration {
      margin-right: 12px;

      svg {
        color: ${MainStyle.color.primary};
        font-size: 24px;
      }
    }

    .title {
      font-size: 18px;
      font-weight: bold;
      color: $dark;
      margin-bottom: 6px;
    }

    .body {
    }
  }
`;

const MoreButton = styled.span`
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  svg {
    margin-right: ${MainStyle.space.s}px;
  }
`;

const ObvyLogo = styled.i`
  display: inline-block;
  width: 65px;
  height: 18px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("/images/obvy-logo-color.svg");
  transform: translateY(4px);
`;
