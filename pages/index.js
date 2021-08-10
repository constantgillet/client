import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import Button from "../components/Button";
import Container from "../components/Container";
import { Row, Col } from "antd";
import { MainStyle } from "../styles/style";
import TextInput from "../components/TextInput";
import Select from "../components/SelectOld";
import categoriesOptions from "../docs/categories.json";
import OffersList from "../components/OffersList";
import Main from "../components/Main";
import Meta from "../components/Meta";
import { getAllOffer } from "../lib/API/offferAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt } from "@fortawesome/fontawesome-free-solid";

const MainElement = styled(Main)`
  padding-bottom: ${MainStyle.space.l}px;
`;

const SectionIntro = styled.section`
  padding-top: ${MainStyle.space.xl + 48}px;
  padding-bottom: ${MainStyle.space.xl + 48}px;
  position: relative;

  @keyframes backgroundImageIntroAnimation {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.2) translate(5%, 5%);
    }

    100% {
      transform: scale(1) translate(0%, 0%);
    }
  }
`;

const SectionIntroBackground = styled.div`
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0%;
  left: 0%;

  &::before {
    content: "";
    width: 100%;
    display: flex;
    position: absolute;
    height: 100%;
    top: 0px;
    background: linear-gradient(0deg, rgba(16, 35, 58, 0.67), rgba(16, 35, 58, 0.67)),
      url(/images/backgrounds/background-index.jpg);
    background-size: cover;
    background-position: center;
    animation: backgroundImageIntroAnimation 60s ease-out backwards infinite;
  }
`;

const SectionIntroTitle = styled.h1`
  font-size: 49px;
  font-weight: bold;
  line-height: 59px;
  color: ${MainStyle.color.light};
  margin-bottom: ${MainStyle.space.l}px;
`;

const SeachAnnonceCol = styled(Col)`
  margin-top: ${MainStyle.space.xl}px;
  display: flex;
  justify-content: center;

  @media (min-width: ${MainStyle.breakpoint.md}px) {
    margin-top: 0px;
  }
`;

const SearchBox = styled.div`
  width: 100%;
  background-color: ${MainStyle.color.light};
  padding: ${MainStyle.space.l}px;
  border-radius: ${MainStyle.radius.m}px;
  height: fit-content;

  @media (min-width: ${MainStyle.breakpoint.md}px) {
    width: 360px;
  }

  button {
    margin-top: ${MainStyle.space.m}px;
  }
`;

const SearchBoxInput = styled(TextInput)`
  margin-bottom: ${MainStyle.space.m}px;
`;

const SearchBoxSelect = styled(Select)`
  margin-bottom: ${MainStyle.space.m}px;
`;

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

const PageSection = styled.section`
  margin-top: ${MainStyle.space.l}px;
  margin-bottom: ${MainStyle.space.l}px;
`;

export default function Home({ ...props }) {
  //console.log(props);
  return (
    <MainElement>
      <Meta />
      <SectionIntro>
        <SectionIntroBackground />
        <Container>
          <Row>
            <Col md={12}>
              <SectionIntroTitle>Achetez & vendez votre matériel d’airsoft</SectionIntroTitle>

              <Link href="/">
                <a>
                  <Button>S'inscrire</Button>
                </a>
              </Link>
            </Col>
            <SeachAnnonceCol md={12}>
              <SearchBox>
                <SearchBoxInput placeholder="Votre recherche" />
                <SearchBoxSelect
                  instanceId="categorySelect"
                  options={categoriesOptions}
                  placeholder="Catégorie"
                />
                <SearchBoxSelect instanceId="regionSelect" options={options} placeholder="Catégorie" />
                <Button block>Rechercher</Button>
              </SearchBox>
            </SeachAnnonceCol>
          </Row>
        </Container>
      </SectionIntro>

      <PageSection>
        <Container>
          <OffersList title="Les dernières annonces ajoutées" offers={props.offersList1} />
        </Container>
      </PageSection>

      <PageSection>
        <Container>
          <AdBanner />
        </Container>
      </PageSection>

      <PageSection>
        <Container>
          <OffersList title="D'autres annonces" offers={props.offersList2} />
        </Container>
      </PageSection>

      <PageSection>
        <Container>
          <ProtectBanner />
        </Container>
      </PageSection>
    </MainElement>
  );
}

export async function getServerSideProps(context) {
  try {
    const resp = await getAllOffer({
      limit: 12
    });
    const offers = resp.data.data;

    const offersList1 = offers.slice(0, 4);
    const offersList2 = offers.slice(4, 12);

    return {
      props: {
        offersList1: offersList1,
        offersList2: offersList2
      }
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        offersList1: [],
        offersList2: []
      }
    };
  }
}

const AdBanner = () => {
  return (
    <AdBannerElement>
      <Col md={10}>
        <AdBannerTitle>Vous n’utilisez plus votre matériel d’airsoft ?</AdBannerTitle>
        <AdBannerText>
          UpGear est la première plateforme dédiée à la vente d'équipement d’airsoft entre airsofteurs
          passionnés. Vendez vos équipements et achetez-en de nouveaux.
        </AdBannerText>
      </Col>
      <Link href="/">
        <a title="Page d'ajout d'annonces">
          <Button type="outline-light">Vendre des équipements</Button>
        </a>
      </Link>
    </AdBannerElement>
  );
};

const AdBannerElement = styled.div`
  border-radius: ${MainStyle.radius.m}px;
  padding: ${MainStyle.space.l}px;
  background-size: cover;
  background-position: center;
  background-image: url("/images/banners/banner-1.jpg");

  h2,
  p {
    color: white;
  }
`;

const AdBannerTitle = styled.h2`
  font-size: ${MainStyle.text.title.fontSize};
  font-weight: ${MainStyle.text.title.fontWeight};
  line-height: ${MainStyle.text.title.lineHeight};
`;

const AdBannerText = styled.p`
  margin-bottom: ${MainStyle.space.l}px;
`;

const ProtectBanner = () => {
  return (
    <ProtectBannerElement>
      <Col md={9}>
        <AdBannerTitle>Achetez & vendez en toute sécurité</AdBannerTitle>
        <ProtectectText>
          Acheter une réplique d’airsoft à des particuliers n’est pas simple. Achetez de façon sécurisée vous
          grâce à la protection Obvy disponnible sur toutes les annonces.
        </ProtectectText>
      </Col>
      <ProtectectInfos>
        <FontAwesomeIcon icon={faShieldAlt} /> Achat protégé par <ObvyLogo />
      </ProtectectInfos>
      <Link href="/paiement-securise">
        <a title="En savoir plus sur la livraison Obvy">
          <Button type="link">En savoir plus </Button>
        </a>
      </Link>
    </ProtectBannerElement>
  );
};

const ProtectectText = styled.p`
  margin-bottom: ${MainStyle.space.s}px;
`;

const ProtectectInfos = styled.p`
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin-bottom: ${MainStyle.space.s}px;

  svg {
    font-size: 32px;
    margin-right: ${MainStyle.space.s}px;
  }
`;

const ProtectBannerElement = styled.div`
  border-radius: ${MainStyle.radius.m}px;
  padding: ${MainStyle.space.l}px;
  background-size: cover;
  background-position: center;
  background-image: url("/images/banners/banner-2.jpg");

  h2,
  p {
    color: ${MainStyle.color.primary};
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
`;
