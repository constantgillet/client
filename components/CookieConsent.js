import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { MainStyle } from "../styles/style";
import Button from "./Button";
import Card from "./Card";
import Link from "next/link";

const CookieConsentElement = styled.div`
  width: 100%;
  padding: ${MainStyle.space.m}px;
  position: fixed;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: ${MainStyle.radius.m}px;
  z-index: 999;
  justify-content: space-between;
  align-items: center;
  filter: drop-shadow(0px 5px 14px rgba(0, 0, 0, 0.2));
  display: none;

  p {
    margin-bottom: 0px;
    font-size: 16px;
  }

  @media (min-width: ${MainStyle.breakpoint.sm}px) {
    max-width: 540px;
  }

  @media (min-width: ${MainStyle.breakpoint.md}px) {
    max-width: 720px;
  }

  @media (min-width: ${MainStyle.breakpoint.lg}px) {
    max-width: 960px;
  }

  @media (min-width: ${MainStyle.breakpoint.xl}px) {
    max-width: 1140px;
  }

  ${({ show }) =>
    show &&
    css`
      display: flex;
    `}
`;

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("acceptCookies")) {
    } else {
      setShow(true);
    }
  }, []);

  const onButtonClick = () => {
    setShow(false);
    localStorage.setItem("acceptCookies", true);
  };

  return (
    <CookieConsentElement show={show}>
      <p>
        En navigant sur Upgear, vous acceptez les cookies.{" "}
        <Link href="/CGU">
          <a title="Conditions d'utilisation">En savoir plus </a>
        </Link>
      </p>
      <Button onClick={onButtonClick}>D'accord</Button>
    </CookieConsentElement>
  );
}
