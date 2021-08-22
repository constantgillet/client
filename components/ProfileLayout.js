import { faHeart, faUser } from "@fortawesome/fontawesome-free-solid";
import { faBuffer } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "antd";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { MainStyle } from "../styles/style";

const RowElement = styled(Row)`
  padding: ${MainStyle.space.l}px 0px;
`;

const NavigationList = styled.ul`
  list-style: none;
  padding-left: 0px;
`;

const ListItem = styled.li`
  border-bottom: 1px solid #9fa7b0;

  a {
    padding: 12px 16px;
    display: inline-flex;
    color: #707b89;
    font-size: 16px;
  }

  svg {
    transition: all ease-in 0.3s;
    color: #9fa7b0;
    font-size: 24px;
    width: auto;
    margin-right: 16px;
  }

  &:hover {
    a {
      font-weight: 600;
      color: #707b89;
    }

    svg {
      color: ${MainStyle.color.primary};
    }
  }
`;

export default function ProfileLayout({ ...props }) {
  return (
    <RowElement gutter={MainStyle.gutter}>
      <Col md={6}>
        <NavigationList>
          <ListItem>
            <Link href="/">
              <a title="Mon profil">
                <FontAwesomeIcon icon={faUser} /> Mon profil
              </a>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/">
              <a title="Mes annonces">
                <FontAwesomeIcon icon={faBuffer} /> Mes annonces
              </a>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/compte/mes-favoris">
              <a title="Mes favoris">
                <FontAwesomeIcon icon={faHeart} /> Mes favoris
              </a>
            </Link>
          </ListItem>
        </NavigationList>
      </Col>
      <Col md={18}>{props.children}</Col>
    </RowElement>
  );
}
