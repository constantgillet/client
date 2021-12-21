import { Col } from "antd";
import Button from "./Button";
import Link from "next/link";
import styled from "styled-components";
import { MainStyle } from "../styles/style";

const AdBanner = ({ className }) => {
  return (
    <AdBannerElement className={className}>
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

export default AdBanner;
