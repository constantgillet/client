import React from "react";
import Main from "../../components/Main";
import Meta from "../../components/Meta";
import ProfileLayout from "../../components/ProfileLayout";
import Container from "../../components/Container";
import ProfileBanner from "../../components/ProfileBanner";
import styled from "styled-components";
import { MainStyle } from "../../styles/style";
import Button from "../../components/Button";
import { Col, Row } from "antd";
import Input from "../../components/Input";

const { Label, TextAera } = Input;

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

const FormPartRow = styled(Row)`
  margin-bottom: ${MainStyle.space.m}px;
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
            <FormPartRow gutter={MainStyle.gutter}>
              <Col span={24} md={12}>
                <Label htmlFor="input-location">Localisation publique</Label>
                <Input id="input-location" placeholder="Localisation publique" />
              </Col>
              <Col span={24} md={12}>
                <Label htmlFor="input-team">Team /équipe</Label>
                <Input id="input-team" placeholder="Votre team / équipe" />
              </Col>
            </FormPartRow>
            <FormPartRow gutter={MainStyle.gutter}>
              <Col span={24}>
                <Label htmlFor="input-description">Description</Label>
                <TextAera id="input-description" placeholder="Description" />
              </Col>
            </FormPartRow>
            <CardBottom>
              <Button>Sauvegarder</Button>
            </CardBottom>
          </CardSection>
        </ProfileLayout>
      </Container>
    </Main>
  );
}
