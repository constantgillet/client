import { getSession } from "next-auth/client";
import Main from "../../components/Main";
import FavoriteAPI from "../../lib/api/favoritesAPI";
import OfferAPI from "../../lib/api/offerAPI";
import Meta from "../../components/Meta";
import Container from "../../components/Container";
import ProfileLayout from "../../components/ProfileLayout";
import styled from "styled-components";
import { MainStyle } from "../../styles/style";
import OfferCard from "../../components/OfferCard";
import { Row, Col, message } from "antd";
import Link from "next/link";
import { API_IMAGES_PATH } from "../../lib/constants";
import { toReadablePrice } from "../../helpers/textHelpers";
import Image from "next/image";
import { faEye, faPlus, faTrash } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/Button";
import { useState } from "react";
import Modal from "../../components/Modal";

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
export default function MyOffers({ offers }) {
  const [currentOffers, setCurrentOffers] = useState(offers || []);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState({ id: 0, title: "" });
  const [isDeleting, setIsDeleting] = useState(false);

  const onClickDelete = (e, offerId, offerTitle) => {
    e.stopPropagation();
    setSelectedOffer({ id: offerId, title: offerTitle });
    setShowDeleteModal(true);
  };

  const onConfirmDelete = () => {
    if (!isDeleting) {
      setIsDeleting(true);
      new OfferAPI()
        .deleteOffer(selectedOffer.id)
        .then((res) => {
          const newOffers = currentOffers.filter((offer, index) => offer.id != selectedOffer.id);
          setCurrentOffers(newOffers);
          setIsDeleting(false);
          setShowDeleteModal(false);
          message.success("L'annonce a été supprimée.");
        })
        .catch((err) => {
          setIsDeleting(false);
          setShowDeleteModal(false);
          message.error("Erreur lors de la suppression de l'annonce.");
        });
    } else {
      message.error("Il y a déjà une suppression en cours");
    }
  };

  return (
    <Main>
      <Meta title="Mes annonces" description="Retrouvez ici les annonces que vous avez créées." />
      <Container>
        <ProfileLayout>
          <CardSection>
            <CardTitle>Mes annonces</CardTitle>
            <p>Vous retrouverez ici les annonces que vous avez créées.</p>
            {currentOffers.length ? (
              <RowElement gutter={MainStyle.gutter}>
                {currentOffers?.map((offer, index) => (
                  <OwnedOfferCard
                    key={index}
                    offer={offer}
                    onClickDelete={(e) => {
                      onClickDelete(e, offer.id, offer.title);
                    }}
                  />
                ))}
              </RowElement>
            ) : (
              <NoResult />
            )}
          </CardSection>
        </ProfileLayout>
        <Modal
          visible={showDeleteModal}
          okText="Supprimer"
          cancelText="Annuler"
          onCancel={() => setShowDeleteModal(false)}
          onOk={onConfirmDelete}
        >
          Etes-vous sûr de vouloir supprimer l'annonce "{selectedOffer?.title}" ?
        </Modal>
      </Container>
    </Main>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: `/auth/connexion?error=RequiredLogin`,
        statusCode: 303
      }
    };
  }

  try {
    const respOffers = await new OfferAPI().getAllOffer({ userId: session.user.id });

    let offers = [];
    if (respOffers.data.data) {
      offers = respOffers.data.data.offers;
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

const ViewsCount = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
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

const DeleteButton = styled(Button)`
  margin-top: ${MainStyle.space.xs}px;
`;

const OwnedOfferCard = ({ offer, onClickDelete }) => {
  return (
    <Col span={24} sm={12} lg={8}>
      <Link href={`/offres/${offer.category}/${offer.id}`}>
        <OfferLink title={offer.title}>
          <CardHead>
            <OfferImage
              src={API_IMAGES_PATH + "min-" + offer.images[0]?.src}
              width={236}
              height={236}
              layout="responsive"
            />
            <ViewsCount>
              <FontAwesomeIcon icon={faEye} /> {offer?.views && offer?.views}
            </ViewsCount>
          </CardHead>
          <CardBody>
            <OfferTitle> {offer.title} </OfferTitle>
            <OfferPrice> {toReadablePrice(offer.price)} </OfferPrice>
            <DeleteButton
              type="outline-danger"
              icon={<FontAwesomeIcon icon={faTrash} />}
              size="small"
              onClick={(e) => onClickDelete(e)}
            >
              Supprimer
            </DeleteButton>
          </CardBody>
        </OfferLink>
      </Link>
    </Col>
  );
};

const NoResultElement = styled(Row)`
  justify-content: center;
  align-items: center;
`;

const NoOfferBlock = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: ${MainStyle.space.xl}px auto;
`;

const NoResult = () => {
  return (
    <NoResultElement>
      <NoOfferBlock span={24} md={12}>
        <p>Vous n'avez créé aucune annonce pour le moment</p>
        <Link href="/ajouter-une-annonce">
          <a title="Ajouter une annonce">
            <Button icon={<FontAwesomeIcon icon={faPlus} />}>Ajouter une annonce</Button>
          </a>
        </Link>
      </NoOfferBlock>
    </NoResultElement>
  );
};
