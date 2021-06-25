import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import Button from "../components/Button";
import Col from "../components/Col";
import Container from "../components/Container";
import { Row } from "antd";
import { MainStyle } from "../styles/style";
import TextInput from "../components/TextInput";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Select from "../components/Select";
import categoriesOptions from "../docs/categories.json";
import AnnoncesList from "../components/AnnoncesList";
import Main from "../components/Main";
import { getAllAnnonces } from "../lib/annoncesAPI";

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
    <Main>
      <Head>
        <title>UpGear | Achetez et vendez vos équipements d'airsoft</title>
      </Head>

      <SectionIntro>
        <SectionIntroBackground />
        <Container>
          <Row>
            <Col md={6}>
              <SectionIntroTitle>Achetez & vendez votre matériel d’airsoft</SectionIntroTitle>

              <Link href="/">
                <a>
                  <Button>S'inscrire</Button>
                </a>
              </Link>
            </Col>
            <SeachAnnonceCol md={6}>
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
          <AnnoncesList title="Les dernières annonces ajoutées" annonces={props.annoncesList1} />
        </Container>
      </PageSection>

      <PageSection>
        <Container>
          <AnnoncesList title="D'autres annonces" annonces={props.annoncesList2} />
        </Container>
      </PageSection>
    </Main>
  );
}

export async function getServerSideProps(context) {
  const data = await getAllAnnonces();

  const annonces = data.annonces;

  const annoncesList1 = annonces.slice(0, 4);
  const annoncesList2 = annonces.slice(4, 12);

  return {
    props: {
      annoncesList1: annoncesList1,
      annoncesList2: annoncesList2
    }
  };
}
