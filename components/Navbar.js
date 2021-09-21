import styled, { css } from "styled-components";
import { MainStyle } from "../styles/style";
import Container from "./Container";
import Link from "next/link";
import { darken } from "polished";
import Menu from "../components/Menu";
import { Dropdown } from "antd";

const NavbarElement = styled.nav`
  background-color: ${MainStyle.color.primary};
  position: relative;
  display: flex;
  align-items: center;

  ${({ display }) =>
    !display &&
    css`
      display: none;
    `}

  @media (min-width: ${MainStyle.breakpoint.lg}px) {
    flex-flow: row nowrap;
    justify-content: flex-start;
  }
`;

const NavbarList = styled.ul`
  display: flex;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  margin-right: auto;
  color: ${MainStyle.color.light};

  @media (min-width: ${MainStyle.breakpoint.lg}px) {
    flex-direction: row;
  }
`;

const ListItem = styled.li`
  position: relative;

  & > span {
    display: inline-block;
    font-size: ${MainStyle.text.bodyBold.fontSize};
    font-weight: ${MainStyle.text.bodyBold.fontWeight};
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: all 0.1s ease-in-out;

    &:hover {
      background-color: ${darken(0.05, MainStyle.color.primary)};
    }
  }
`;

const SubList = styled.ul`
  display: none;
  position: absolute;
  top: 40px;
  border: 1.5px solid #f2f3f7;
  border-radius: ${MainStyle.radius.m}px;
  filter: drop-shadow(0px 5px 14px rgba(0, 0, 0, 0.1));
  padding: 8px 8px;
  background: white;
  width: max-content;
`;

const SubListItem = styled.li`
  position: relative;
  margin-bottom: ${MainStyle.space.xs}px;
  font-size: ${MainStyle.text.body.fontSize};
  font-weight: ${MainStyle.text.body.fontWeight};
  border-radius: ${MainStyle.radius.s}px;

  a {
    display: block;
    text-decoration: none;
    color: ${MainStyle.color.dark};
    padding: ${MainStyle.space.s}px ${MainStyle.space.m}px;

    &:hover {
      color: ${MainStyle.color.dark};
    }
  }

  &:hover {
    background-color: ${darken(0.05, MainStyle.color.light)};
  }
`;

const MenuElement = styled(Menu)``;

const authMenu = (
  <MenuElement>
    <Menu.Item key="repliques-longues-aeg">
      <Link href="/offres/repliques_aeg">
        <a title="Répliques longues AEG">Répliques longues AEG</a>
      </Link>
    </Menu.Item>
    <Menu.Item key="repliques-longues-gbbr">
      <Link href="/offres/repliques_gbbr">
        <a title="Répliques longues GBBR">Répliques longues GBBR</a>
      </Link>
    </Menu.Item>
    <Menu.Item key="repliques-hpa">
      <Link href="/offres/repliques_hpa">
        <a title="Répliques longues HPA">Répliques longues HPA</a>
      </Link>
    </Menu.Item>
    <Menu.Item key="sniper-spring">
      <Link href="/offres/sniper_spring">
        <a title="Répliques longues HPA">Répliques de sniper spring</a>
      </Link>
    </Menu.Item>
    <Menu.Item key="/offres/sniper_spring">
      <Link href="/">
        <a title="Répliques longues HPA">Répliques de sniper gaz</a>
      </Link>
    </Menu.Item>
    <Menu.Item key="my-profile">
      <Link href="/">
        <a title="Répliques longues HPA">Répliques à pompe string</a>
      </Link>
    </Menu.Item>
    <Menu.Item key="my-profile">
      <Link href="/">
        <a title="Répliques longues HPA">Répliques à pompe gaz</a>
      </Link>
    </Menu.Item>
  </MenuElement>
);

export default function Navbar({ display }) {
  return (
    <NavbarElement display={display ? 1 : 0}>
      <Container>
        <NavbarList>
          <Dropdown overlay={authMenu} getPopupContainer={(element) => element.parentNode}>
            <ListItem>
              <span> Répliques longues</span>
            </ListItem>
          </Dropdown>
          <ListItem>
            <span>Répliques de poing</span>
            <SubList>
              <SubListItem>
                <Link href="/">
                  <a>Répliques longues AEG</a>
                </Link>{" "}
              </SubListItem>
              <SubListItem>
                <Link href="/">
                  <a>Répliques longues AEG</a>
                </Link>{" "}
              </SubListItem>
              <SubListItem>
                <Link href="/">
                  <a>Répliques longues AEG</a>
                </Link>{" "}
              </SubListItem>
              <SubListItem>
                <Link href="/">
                  <a>Répliques longues AEG</a>
                </Link>{" "}
              </SubListItem>
              <SubListItem>
                <Link href="/">
                  <a>Répliques longues AEG</a>
                </Link>{" "}
              </SubListItem>
            </SubList>
          </ListItem>
        </NavbarList>
      </Container>
    </NavbarElement>
  );
}
