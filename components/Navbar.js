import styled from "styled-components";
import { MainStyle } from "../styles/style";
import Container from "./Container";
import Link from "next/link";
import { darken } from "polished";

const NavbarElement = styled.nav`
  background-color: ${MainStyle.color.primary};
  position: relative;
  display: flex;
  align-items: center;

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

  &.show {
    display: block;
  }
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

const onClickListItem = (e) => {
  const subList = e.target.nextSibling;

  subList.classList.add("show");
};

export default function Navbar() {
  return (
    <NavbarElement>
      <Container>
        <NavbarList>
          <ListItem>
            <span onClick={onClickListItem}>Répliques longues</span>
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
          <ListItem>
            <span onClick={onClickListItem}>Répliques de poing</span>
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
