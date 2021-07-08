import { getSession, useSession } from "next-auth/client";
import api from "../lib/API/api";
import Main from "../components/Main";
import styled from "styled-components";
import Container from "../components/Container";
import { Row, Col } from "antd";
import { MainStyle } from "../styles/style";
import { useEffect } from "react";
import Separator from "../components/Separator";
import Input from "../components/Input";
import Button from "../components/Button";
import { Radio } from "antd";

const FormSection = styled.section`
  background: white;
  margin-top: ${MainStyle.space.l}px;
  margin-bottom: ${MainStyle.space.l}px;
  border-radius: ${MainStyle.radius.m}px;
  border: ${MainStyle.card.border};
`;

const MainTitle = styled.h1`
  font-size: ${MainStyle.text.title.fontSize};
  font-weight: ${MainStyle.text.title.fontWeight};
  line-height: ${MainStyle.text.title.lineHeight};
  margin-bottom: ${MainStyle.space.s}px;
`;

const FormPart = styled.div`
  padding: ${MainStyle.space.l}px;
`;

const InputLabel = styled.label`
  font-size: ${MainStyle.text.body.fontSize};
  display: inline-block;
  font-weight: 600;
  margin-bottom: ${MainStyle.space.s}px;
`;

export default function AddAnnonce(props) {
  const [session, loading] = useSession();

  return (
    <Main>
      <Container style={{ paddingTop: MainStyle.space.l + "px", paddingBottom: MainStyle.space.xl + "px" }}>
        <FormSection style={{ marginTop: "0px" }}>
          <FormPart style={{ paddingBottom: "0px" }}>
            <MainTitle> Ajouter une annonce</MainTitle>
          </FormPart>
          <FormPart></FormPart>
        </FormSection>

        <FormSection>
          <FormPart>
            <Row gutter={30}>
              <Col span={24} md={12}>
                <InputLabel htmlFor="input-title">Titre de l'annonce :</InputLabel>
              </Col>
              <Col span={24} md={12}>
                <Input placeholder="Ex: Famas tokyo marui" id="input-title" />
              </Col>
            </Row>
          </FormPart>

          <Separator />

          <FormPart>
            <Row gutter={30}>
              <Col span={24} md={12}>
                <InputLabel htmlFor="input-description">Description de l'annonce :</InputLabel>
              </Col>
              <Col span={24} md={12}>
                <Input.TextAera
                  placeholder="Ex: Utilisé pendant une dizaine de partie, très bon état"
                  id="input-description"
                  autoSize={{ minRows: 4 }}
                />
              </Col>
            </Row>
          </FormPart>
        </FormSection>

        <FormSection>
          <FormPart>
            <Row gutter={30}>
              <Col span={24} md={12}>
                <InputLabel htmlFor="input-title">Catégorie :</InputLabel>
              </Col>
              <Col span={24} md={12}>
                <Input placeholder="Ex: Famas tokyo marui" id="input-title" />
              </Col>
            </Row>
          </FormPart>

          <Separator />

          <FormPart>
            <Row gutter={30}>
              <Col span={24} md={12}>
                <InputLabel htmlFor="input-description">Prix de l'annonce :</InputLabel>
              </Col>
              <Col span={24} md={12}>
                <Input.Number
                  placeholder="120,00€"
                  id="input-description"
                  formatter={(value) => `${value} €`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                />
              </Col>
            </Row>
          </FormPart>
        </FormSection>

        <FormSection>
          <FormPart>
            <Row gutter={30}>
              <Col span={24} md={12}>
                <InputLabel htmlFor="input-title">Votre ville :</InputLabel>
              </Col>
              <Col span={24} md={12}>
                <Input placeholder="Ex: Famas tokyo marui" id="input-title" />
              </Col>
            </Row>
          </FormPart>

          <Separator />

          <FormPart>
            <Row gutter={30}>
              <Col span={24} md={12}>
                <InputLabel htmlFor="input-description">Categorie de la livraion :</InputLabel>
                <p>Vendez facilement et plus rapidement vos équipements grâce à notre partenaire Obvy</p>
              </Col>
              <Col span={24} md={12}>
                <Radio.Group name="radiogroup" buttonStyle="solid" defaultValue={1}>
                  <Radio.Button value={1}>S (max. 2kg)</Radio.Button>
                  <Radio.Button value={2}>M (max. 5kg) </Radio.Button>
                  <Radio.Button value={3}>L (max. 10kg) </Radio.Button>
                  <Radio.Button value={4}>XL (max. 15kg) </Radio.Button>
                </Radio.Group>
              </Col>
            </Row>
          </FormPart>

          <Separator />

          <FormPart>
            <Row gutter={30}>
              <Col span={24} md={12}>
                <InputLabel htmlFor="input-description">Numéro de téléphone (optionnel) :</InputLabel>
              </Col>
              <Col span={24} md={12}>
                <Input placeholder="+33422424424" id="input-description" style={{ width: "180px" }} />
              </Col>
            </Row>
          </FormPart>
        </FormSection>

        <Button>Ajouter l'annonce</Button>
      </Container>
    </Main>
  );
}
