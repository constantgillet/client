import { faEye } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { MainStyle } from "../styles/style";
import Button from "./Button";

const ProfileBannerElement = styled.div`
  position: relative;
  border-radius: ${MainStyle.radius.m}px;
  box-shadow: 1px 2px 4px rgb(0 0 0 / 7%), -3px -3px 9px rgb(0 0 0 / 6%);
  width: 100%;
  padding: 38px;
  background-image: url(/images/background-1.jpg);
  background-position: center;
  background-size: cover;
`;

const ButtonProfile = styled(Button)`
  position: absolute;
  bottom: 24px;
  right: 24px;
`;

const ProfileImage = styled(Image)`
  height: auto !important;
  border-radius: 50% !important;
  border: 2px solid #fff !important;
`;

export default function ProfileBanner({ profilePicture, bannerPicture, showButton, buttonLink }) {
  profilePicture = profilePicture ? profilePicture : "/images/profile.jpg";
  return (
    <ProfileBannerElement style={{ backgroundImage: bannerPicture && `url(${bannerPicture})` }}>
      <ProfileImage src={profilePicture} width={114} height={114} />
      {showButton && (
        <Link href={buttonLink ? buttonLink : "/"}>
          <a title="Lien du profil">
            <ButtonProfile type="outline-primary" icon={<FontAwesomeIcon icon={faEye} />}>
              Afficher le profil
            </ButtonProfile>
          </a>
        </Link>
      )}
    </ProfileBannerElement>
  );
}
