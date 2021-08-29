import React from "react";
import Main from "../../components/Main";
import Meta from "../../components/Meta";
import ProfileLayout from "../../components/ProfileLayout";
import Container from "../../components/Container";
import ProfileBanner from "../../components/ProfileBanner";
import styled from "styled-components";
import { MainStyle } from "../../styles/style";
import Button from "../../components/Button";

const CardSection = styled.section`
  background: white;
  padding: ${MainStyle.space.l}px;
  border-radius: ${MainStyle.radius.m}px;
  border: ${MainStyle.card.border};
  margin-top: ${MainStyle.space.l}px;
`;

const CardTitle = styled.h1`
  font-size: ${MainStyle.text.title.fontSize};
  font-weight: ${MainStyle.text.title.fontWeight};
`;

const CardBottom = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default function MyProfile() {
  return (
    <Main>
      <Meta title="Mon profil | Upgear" />
      <Container>
        <ProfileLayout>
          <ProfileBanner showButton />
          <CardSection>
            <CardTitle>Profil</CardTitle>
            <CardBottom>
              <Button>Sauvegarder</Button>
            </CardBottom>
          </CardSection>
        </ProfileLayout>
      </Container>
    </Main>
  );
}
