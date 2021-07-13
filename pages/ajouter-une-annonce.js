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
import Select from "../components/Select";
import Image from "next/dist/client/image";
import { connect } from "react-redux";

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

const ObvyLogo = styled.span`
  display: inline-block;
  width: 65px;
  height: 18px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("/images/obvy-logo-color.svg");
  transform: translateY(4px);
  margin-left: 4px;
`;

function AddAnnonce(props) {
  const [session, loading] = useSession();

  const { categories } = props;

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
                <InputLabel htmlFor="input-category">Catégorie :</InputLabel>
              </Col>
              <Col span={24} md={12}>
                <Select placeholder="Choisissez une catégorie" style={{ width: "100%" }} id="input-category">
                  {categories?.map((category, index) => {
                    return (
                      <Select.OptGroup key={index} label={category.label}>
                        {category.subcategories.map((subcategory) => (
                          <Select.Option key={subcategory.name} value={subcategory.name}>
                            {subcategory.label}
                          </Select.Option>
                        ))}
                      </Select.OptGroup>
                    );
                  })}
                </Select>
              </Col>
            </Row>
          </FormPart>

          <Separator />

          <FormPart>
            <Row gutter={30}>
              <Col span={24} md={12}>
                <InputLabel htmlFor="input-price">Prix de l'annonce :</InputLabel>
              </Col>
              <Col span={24} md={12}>
                <Input.Number
                  placeholder="120,00€"
                  id="input-price"
                  formatter={(value) => `${value} €`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  min={1}
                  max={2000}
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
                <p>
                  Vendez facilement et plus rapidement vos équipements grâce à notre partenaire
                  <ObvyLogo />
                </p>
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
                <InputLabel htmlFor="input-phone">Numéro de téléphone (optionnel) :</InputLabel>
                <p>
                  Mettez un numéro de téléphone si vous souhaitez être contacté autrement que par la
                  messagerie upgear.
                </p>
              </Col>
              <Col span={24} md={12}>
                <Input placeholder="+33422424424" type="tel" id="input-phone" style={{ width: "180px" }} />
              </Col>
            </Row>
          </FormPart>
        </FormSection>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button>Ajouter l'annonce</Button>
        </div>
      </Container>
    </Main>
  );
}

const mapState = (state) => {
  return {
    categories: state.category.categories
  };
};

const mapDis = {};

export default connect(mapState, mapDis)(AddAnnonce);
