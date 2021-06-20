import styled from "styled-components";
import { MainStyle } from "../styles/style";
import { Col, Row } from "antd";

const MainElement = styled.main`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const RowMain = styled(Row)`
  height: 100%;
`;

const ColMain = styled(Col)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ColIllustration = styled(Col)`
  position: relative;
  height: 100%;
  background: linear-gradient(0deg, rgba(16, 35, 58, 0.7), rgba(16, 35, 58, 0.7)),
    url(/images/backgrounds/register_background.jpg) center;
  background-size: cover;
  color: #f8f9fa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: ${MainStyle.breakpoint.md}px) {
    display: none;
  }

  h1 {
    font-size: 3.5rem;
    font-weight: 300;
    line-height: 1.2;
    margin-bottom: ${MainStyle.space.m}px;
    color: white;
  }

  h2 {
    font-size: 24px;
    font-weight: 600;
    line-height: 1;
    color: white;
  }

  span {
    position: absolute;
    right: 46px;
    bottom: 24px;

    a {
      text-decoration: none;
    }
  }
`;

export default function AuthLayout({ children, title = "Titre de la page", text = "texte de la page" }) {
  return (
    <MainElement>
      <RowMain>
        <ColMain span={24} md={8}>
          {children}
        </ColMain>
        <ColIllustration md={16}>
          <h1>{title}</h1>
          <h2>{text}</h2>
          <span>
            Créé par{" "}
            <a rel="nofollow" href="https://www.linkedin.com/in/constant-gillet/" target="_blank">
              Constant GILLET
            </a>
          </span>
        </ColIllustration>
      </RowMain>
    </MainElement>
  );
}
