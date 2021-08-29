import Link from "next/link";
import styled, { css } from "styled-components";
import Container from "./Container";
import Image from "next/image";
import { Dropdown, Row } from "antd";
import Col from "./Col";
import { MainStyle } from "../styles/style";
import Button from "./Button";
import TextInput from "./TextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faEnvelope, faPlus, faSearch, faUser } from "@fortawesome/fontawesome-free-solid";
import { signOut, useSession } from "next-auth/client";
import { useEffect, useRef, useState } from "react";
import { API_URL } from "../lib/constants";
import { darken } from "polished";
import Menu from "./Menu";

const HeaderElement = styled.header`
  height: 63px;

  ${({ display }) =>
    !display &&
    css`
      display: none;
    `}
`;
const HeaderFixedElement = styled.div`
  display: block;
  background: #ffffff;
  padding: 10px 0px;
  border-bottom: 1px solid #dee2e6 !important;

  ${({ isFixed }) =>
    isFixed &&
    css`
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 10;
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.06));
      animation: header-fixed-animation 0.3s ease-out;
    `}

  ${({ isFixed }) =>
    isFixed &&
    css`
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 10;
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.06));
      animation: header-fixed-animation 0.3s ease-out;
    `}
    

    @keyframes header-fixed-animation {
    from {
      transform: translateY(-100%);
    }

    to {
      transform: translateY(0%);
    }
  }
`;

const LogoCol = styled(Col)`
  display: flex;
  align-items: center;

  a {
    display: flex;
  }
`;
const SearchBar = styled.div`
  width: 100%auto;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
`;

const SearchBarInput = styled(TextInput)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  position: relative;
  flex: 1 1 auto;
  width: 1%;
  min-width: 0;
  margin-bottom: 0;
`;

const SearchBarButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

const AuthActionsDiv = styled.div`
  display: flex;

  @media (min-width: ${MainStyle.breakpoint.md}px) {
    float: right;
  }
`;

const WidgetDiv = styled.div`
  display: inline-flex;
  position: relative;
`;

const IconButtonLink = styled.a`
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  border: 1px solid #dee2e6;
  border-radius: 50%;
  margin-right: ${MainStyle.space.s}px;
`;

const HeaderAuthDiv = styled.div`
  font-size: 14px;
  font-weight: 600;
  height: 6px;
  overflow-y: visible;
`;

const LinkAddNew = styled.a`
  text-decoration: none;
  margin-right: ${MainStyle.space.m}px;
`;

const AuthLink = styled.a`
  text-decoration: none;
`;

const WelcomeMessage = styled.span`
  color: ${MainStyle.color.dark80};
`;

const AuthDropdown = styled.div`
  font-size: 14px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  cursor: pointer;
  position: relative;

  & > div {
    color: ${MainStyle.color.primary};
    margin-left: ${MainStyle.space.s}px;
  }
`;

const ProfilePicture = styled(Image)`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  display: inline-block;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
`;

const DropdownIcon = styled(FontAwesomeIcon)`
  color: ${MainStyle.color.primary};
  margin-left: ${MainStyle.space.xs}px;
  width: 8px;
  height: 12px;
`;

export default function Header({ display, className, ...props }) {
  const headerRef = useRef();
  const [session] = useSession();

  const user = session && session.user ? session.user : null;

  let header;
  let sticky;

  const [isFixed, setIsFixed] = useState(false);

  const getHeaderInfos = () => {
    header = headerRef.current;
    if (header) {
      sticky = header.offsetTop + header.offsetHeight;
    }
  };

  useEffect(() => {
    getHeaderInfos();
    window.onscroll = () => {
      fixHeader();
    };
  }, []);

  const fixHeader = () => {
    if (window.pageYOffset > sticky) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  //Change user picture
  if (user && user.profilePicture) {
    if (user.profilePicture.length) {
      user.profilePicture = "/images/profile.jpg";
    }
  }

  return (
    <HeaderElement display={display ? 1 : 0}>
      <HeaderFixedElement ref={headerRef} isFixed={isFixed} className={className}>
        <Container>
          <Row>
            <LogoCol xs={6} lg={2}>
              <Link href="/">
                <a>
                  <Image src={"/images/logo.png"} width={112} height={22} alt="Upgear logotype" />
                </a>
              </Link>
            </LogoCol>
            <Col xs={12} lg={4} sm={12}>
              <form action="#" className="search">
                <SearchBar>
                  <SearchBarInput type="text" className="form-control" placeholder="Rechercher" />
                  <SearchBarButton>
                    <FontAwesomeIcon icon={faSearch} />
                  </SearchBarButton>
                </SearchBar>
              </form>
            </Col>
            <Col xs={12} lg={6} sm={6}>
              <AuthActionsDiv>
                <Link href="/ajouter-une-annonce">
                  <LinkAddNew className="no-text-decoration" title="Ajouter une annonce">
                    <Button icon={<FontAwesomeIcon icon={faPlus} />}>Ajouter</Button>
                  </LinkAddNew>
                </Link>

                {user ? (
                  <WidgetDiv>
                    <Link href="/">
                      <IconButtonLink title="Page connexion">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </IconButtonLink>
                    </Link>
                    <HeaderAuthDiv>
                      <Dropdown overlay={authMenu} placement="bottomRight">
                        <AuthDropdown>
                          <ProfilePicture
                            src={user.profilePicture.length ? user.profilePicture : "/images/profile.jpg"}
                            width={40}
                            height={40}
                          />
                          <div>{user.username}</div>
                          <DropdownIcon icon={faChevronDown} />
                        </AuthDropdown>
                      </Dropdown>
                    </HeaderAuthDiv>
                  </WidgetDiv>
                ) : (
                  <WidgetDiv>
                    <Link href="/auth/connexion">
                      <IconButtonLink title="Page connexion">
                        <FontAwesomeIcon icon={faUser} />
                      </IconButtonLink>
                    </Link>
                    <HeaderAuthDiv>
                      <WelcomeMessage>Bienvenue sur UpGear!</WelcomeMessage>
                      <div>
                        <Link href="/auth/connexion">
                          <AuthLink title="Page de connexion">Connexion</AuthLink>
                        </Link>
                        <span>|</span>
                        <Link href="/auth/inscription">
                          <AuthLink title="Page inscription">Inscription</AuthLink>
                        </Link>
                      </div>
                    </HeaderAuthDiv>
                  </WidgetDiv>
                )}
              </AuthActionsDiv>
            </Col>
          </Row>
        </Container>
      </HeaderFixedElement>
    </HeaderElement>
  );
}

const authMenu = (
  <Menu>
    <Menu.Item key="offers-item">
      <Link href="/compte/mes-annonces">
        <a title="Mes annonces">Mes annonces</a>
      </Link>
    </Menu.Item>

    <Menu.Item key="favorites-item">
      <Link href="/compte/mes-favoris">
        <a title="Mes favoris">Mes favoris</a>
      </Link>
    </Menu.Item>

    <Menu.Item onClick={signOut} key="logout-item">
      Se déconnecter
    </Menu.Item>
  </Menu>
);
