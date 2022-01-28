import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import Button from "../components/Button";
import Container from "../components/Container";
import { Row, Col } from "antd";
import { MainStyle } from "../styles/style";
import Input from "../components/Input";
import OffersList from "../components/OffersList";
import Main from "../components/Main";
import Meta from "../components/Meta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faShieldAlt, faShippingFast, faUserShield } from "@fortawesome/fontawesome-free-solid";
import OfferAPI from "../lib/api/offerAPI";
import Select from "../components/Select";
import departments from "../docs/departments.json";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { useSession } from "next-auth/client";

const { Option, OptGroup } = Select;

const regions = [];
getRegions();

function getRegions() {
  departments.forEach((department) => {
    const region = { regionCode: department.regionCode, regionName: department.regionName };

    if (!regions.some((_region) => _region.regionCode === region.regionCode)) {
      regions.push(region);
    }
  });
}

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

const SearchBoxInput = styled(Input)`
  margin-bottom: ${MainStyle.space.m}px;
`;

const SearchBoxSelect = styled(Select)`
  margin-bottom: ${MainStyle.space.m}px;
`;

const PageSection = styled.section`
  margin-top: ${MainStyle.space.l}px;
  margin-bottom: ${MainStyle.space.l}px;
`;

function Home({ ...props }) {
  //console.log(props);

  const [session, loading] = useSession();

  const [regionValue, setRegionValue] = useState(null);

  const [categoryValue, setCategoryValue] = useState(null);
  const [queryValue, setQueryValue] = useState("");

  const router = useRouter();

  const onClickSearch = () => {
    const newDepartments = departments.filter((department) => department.regionCode === regionValue);

    let newDepartmentValues = [];
    newDepartmentValues = newDepartments.map((department) => department.departmentCode);

    router.push({
      pathname: categoryValue ? "/offres/" + categoryValue : "/offres",
      query: { departement: newDepartmentValues, q: queryValue }
    });
  };

  return (
    <MainElement>
      <Meta />
      <SectionIntro>
        <SectionIntroBackground />
        <Container>
          <Row>
            <Col md={12}>
              <SectionIntroTitle>Achetez & vendez votre matériel d’airsoft</SectionIntroTitle>

              {session?.user ? (
                <Link href="/offres">
                  <a title="Chercher une annonce">
                    <Button>Chercher une annonce</Button>
                  </a>
                </Link>
              ) : (
                <Link href="/auth/inscription">
                  <a title="Page d'inscription">
                    <Button>S'inscrire</Button>
                  </a>
                </Link>
              )}
            </Col>
            <SeachAnnonceCol md={12}>
              <SearchBox>
                <SearchBoxInput
                  placeholder="Votre recherche"
                  value={queryValue}
                  onChange={(e) => setQueryValue(e.target.value)}
                />
                <SearchBoxSelect
                  placeholder="Catégorie"
                  style={{ width: "100%" }}
                  value={categoryValue}
                  onChange={(val) => setCategoryValue(val)}
                >
                  {props.categories?.map((category, index) => {
                    return (
                      <OptGroup key={index} label={category.label}>
                        {category.subcategories?.map((subcategory) => (
                          <Option key={subcategory.name} value={subcategory.name}>
                            {subcategory.label}
                          </Option>
                        ))}
                      </OptGroup>
                    );
                  })}
                </SearchBoxSelect>
                <SearchBoxSelect
                  placeholder="Région"
                  style={{ width: "100%" }}
                  value={regionValue}
                  onChange={(val) => setRegionValue(val)}
                >
                  {regions?.map((region, index) => {
                    return (
                      <Option key={index} value={region.regionCode}>
                        {region.regionName}
                      </Option>
                    );
                  })}
                </SearchBoxSelect>
                <Button block onClick={onClickSearch}>
                  Rechercher
                </Button>
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

      <PageSection>
        <Container>
          <FeaturesBanner />
        </Container>
      </PageSection>
    </MainElement>
  );
}

export async function getServerSideProps(context) {
  try {
    const resp = await new OfferAPI().getAllOffer({
      limit: 12
    });
    const offers = resp.data.data.offers;

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

const mapState = (state) => {
  return {
    categories: state.category.categories
  };
};

const mapDis = {};

export default connect(mapState, mapDis)(Home);

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
      <Link href="/ajouter-une-annonce">
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
          Acheter une réplique d’airsoft d'occasion n’est pas simple. Achetez de façon sécurisée grâce à la
          protection Obvy disponnible sur toutes les annonces.
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

const FeaturesBanner = () => {
  return (
    <FeaturesBannerElement>
      <Row>
        <FeatureItem
          icon={faLock}
          title="Sécurité & protection"
          text="UpGear a un support actif et vérifie les annonces qui sont postées. Le support est présent & actif, n'hésitez pas à nous contacter."
        />
        <FeatureItem
          icon={faUserShield}
          title="Vie privée"
          text="UpGear possède une messagerie privée, ne laissez pas vos informations fuiter. Nous faisons le maximum pour assurer votre sécurité."
        />
        <FeatureItem
          icon={faShippingFast}
          title="Livraison"
          text="Faites livrer votre équipement d'airsoft en un clic grâce à notre système de livraison. Toutes les livraisons sont sécurisées."
        />
      </Row>
    </FeaturesBannerElement>
  );
};

const FeaturesBannerElement = styled.div`
  border-radius: ${MainStyle.radius.m}px;
  border-radius: 8px;
  background: linear-gradient(0deg, rgba(20, 108, 218, 0.67), rgba(20, 108, 218, 0.67)),
    url(/images/backgrounds/soldier2.jpg);
  background-size: cover;
  background-position: top;
`;

const FeatureItem = ({ icon, title, text }) => {
  return (
    <FeatureItemElement md={8}>
      <FontAwesomeIcon icon={icon} />
      <h3>{title}</h3>
      <p>{text}</p>
    </FeatureItemElement>
  );
};

const FeatureItemElement = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  padding: ${MainStyle.space.m}px;
  color: white;

  svg {
    font-size: 44px;
    margin-bottom: 18px;
  }

  h3 {
    font-weight: 700;
    font-size: ${MainStyle.text.title.fontSize};
    line-height: 30px;
    margin-bottom: 8px;
    color: white;
  }

  p {
    text-align: center;
    font-weight: normal;
    font-size: 16px;
    margin-bottom: 0px;
  }
`;
