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

  a {
    color: white;
  }

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

const MenuElement = styled(Menu)`
  a {
    color: ${MainStyle.color.dark};
  }
`;

const menuContent = [
  [
    { key: "repliques-longues-aeg", link: "/offres/repliques_aeg", name: "Répliques longues AEG" },
    { key: "repliques-longues-gbbr", link: "/offres/repliques_gbbr", name: "Répliques longues GBBR" },
    { key: "repliques-longues-hpa", link: "/offres/repliques_hpa", name: "Répliques longues HPA" },
    {
      key: "repliques-sniper-spring",
      link: "/offres/repliques_sniper_spring",
      name: "Répliques sniper spring"
    },
    {
      key: "repliques-sniper-gaz",
      link: "/offres/repliques_sniper_gaz",
      name: "Répliques sniper gaz"
    },
    {
      key: "repliques-pompe-spring",
      link: "/offres/repliques_pompe_spring",
      name: "Répliques à pompe spring"
    },
    {
      key: "repliques-pompe-gaz",
      link: "/offres/repliques_pompe_gaz",
      name: "Répliques à pompe gaz"
    }
  ],
  [
    { key: "repliques-poing-gbb", link: "/offres/repliques_gbb", name: "Répliques de poing GBB" },
    { key: "repliques-poing-nbb", link: "/offres/repliques_nbb", name: "Répliques de poing NBB" },
    { key: "repliques-poing-aep", link: "/offres/repliques_aep", name: "Répliques de poing AEP" },
    { key: "repliques-revolver", link: "/offres/repliques_revolver", name: "Révolvers" }
  ],
  [
    { key: "chargeurs", link: "/offres/chargeurs", name: "Chargeurs" },
    { key: "organes-visee", link: "/offres/organes_visee", name: "Organes de visée" },
    { key: "lampes-lasers", link: "/offres/lampes_lasers", name: "Lampes et lasers" },
    { key: "pieces-customs", link: "/offres/pieces_customs", name: "Pièces customs" },
    {
      key: "batteries-chargeurs",
      link: "/offres/batteries_chargeurs",
      name: "Batteries et chargeurs de batterie"
    }
  ],
  [
    { key: "pieces_aeg", link: "/offres/pieces_aeg", name: "Pièces AEG" },
    { key: "pieces_gbbr", link: "/offres/pieces_gbbr", name: "Pièces GBBR" },
    { key: "pieces_gbb_nbb", link: "/offres/pieces_gbb_nbb", name: "Pièces GBB et NBB" },
    { key: "pieces_sniper", link: "/offres/pieces_sniper", name: "Pièces de snipers" },
    { key: "pieces_aep", link: "/offres/pieces_aep", name: "Pièces AEP" }
  ],
  [{ key: "paiement-securise", link: "/paiement-securise", name: "Paiement sécurisé" }]
];

const repliquesLongues = (
  <MenuElement>
    {menuContent[0].map((content) => (
      <Menu.Item key={content.key}>
        <Link href={content.link}>
          <a title={content.name}>{content.name}</a>
        </Link>
      </Menu.Item>
    ))}
  </MenuElement>
);

const repliquesPoing = (
  <MenuElement>
    {menuContent[1].map((content) => (
      <Menu.Item key={content.key}>
        <Link href={content.link}>
          <a title={content.name}>{content.name}</a>
        </Link>
      </Menu.Item>
    ))}
  </MenuElement>
);

const accessoires = (
  <MenuElement>
    {menuContent[2].map((content) => (
      <Menu.Item key={content.key}>
        <Link href={content.link}>
          <a title={content.name}>{content.name}</a>
        </Link>
      </Menu.Item>
    ))}
  </MenuElement>
);

const upgrade = (
  <MenuElement>
    {menuContent[3].map((content) => (
      <Menu.Item key={content.key}>
        <Link href={content.link}>
          <a title={content.name}>{content.name}</a>
        </Link>
      </Menu.Item>
    ))}
  </MenuElement>
);

const autre = (
  <MenuElement>
    {menuContent[4].map((content) => (
      <Menu.Item key={content.key}>
        <Link href={content.link}>
          <a title={content.name}>{content.name}</a>
        </Link>
      </Menu.Item>
    ))}
  </MenuElement>
);

export default function Navbar({ display }) {
  return (
    <NavbarElement display={display ? 1 : 0}>
      <Container>
        <NavbarList>
          <Dropdown overlay={repliquesLongues} getPopupContainer={(element) => element.parentNode}>
            <ListItem>
              <span> Répliques longues</span>
            </ListItem>
          </Dropdown>
          <Dropdown overlay={repliquesPoing} getPopupContainer={(element) => element.parentNode}>
            <ListItem>
              <span> Répliques de poing</span>
            </ListItem>
          </Dropdown>

          <Dropdown overlay={accessoires} getPopupContainer={(element) => element.parentNode}>
            <ListItem>
              <span> Accessoires</span>
            </ListItem>
          </Dropdown>
          <Dropdown overlay={upgrade} getPopupContainer={(element) => element.parentNode}>
            <ListItem>
              <span> Upgrade</span>
            </ListItem>
          </Dropdown>
          <Link href="/offres/gear">
            <a title="Gear">
              <ListItem>
                <span> Gear</span>
              </ListItem>
            </a>
          </Link>
          <Dropdown overlay={autre} getPopupContainer={(element) => element.parentNode}>
            <ListItem>
              <span> En savoir plus</span>
            </ListItem>
          </Dropdown>
        </NavbarList>
      </Container>
    </NavbarElement>
  );
}
