import { getSession, useSession } from "next-auth/client";
import api from "../lib/API/api";
import Main from "../components/Main";
import styled from "styled-components";
import Container from "../components/Container";
import { Row, Col } from "antd";
import { MainStyle } from "../styles/style";
import { useEffect, useState } from "react";
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
  const { categories } = props;

  const [state, setState] = useState({
    locationOptions: [],
    images: [],
    title: {
      value: "",
      error: null
    },
    description: {
      value: "",
      error: null
    },
    category: null,
    price: {
      value: "",
      error: null
    },
    location: null,
    shippingCategory: null,
    phone: {
      value: "",
      error: null
    }
  });

  const [isPosting, setIsPosting] = useState(false);

  /**
   * TITLE CHECK
   */
  const onBlurTitleInput = (e) => {
    const _title = e.target.value;

    //If length is more than 0 we continue
    if (_title.length > 0) {
      //If length is less than 50 we continue
      if (_title.length < 50) {
        setState({ ...state, title: { value: _title, error: null } });
      } else {
        setState({ ...state, title: { value: _title, error: "Le titre est trop long" } });
      }
    } else {
      setState({ ...state, title: { value: _title, error: "Vous devez mettre un titre" } });
    }
  };

  /**
   * DESCRIPTION CHECK
   */

  const onBlurDescriptionInput = (e) => {
    const _description = e.target.value;

    //If length is more than 0 we continue
    if (_description.length > 0) {
      //If length is less than 700 we continue
      if (_description.length < 700) {
        setState({ ...state, description: { value: _description, error: null } });
      } else {
        setState({ ...state, description: { value: _description, error: "La description est trop longue" } });
      }
    } else {
      setState({
        ...state,
        description: { value: _description, error: "Vous devez mettre une description" }
      });
    }
  };

  /**
   * PHONE CHECK
   */
  const onBlurPhoneInput = (e) => {
    const _phone = e.target.value;
    const regex =
      /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/gm;

    if (_phone.length > 0) {
      if (regex.test(_phone)) setState({ ...state, phone: { value: _phone, error: null } });
      else setState({ ...state, phone: { value: _phone, error: "Téléphone invalide" } });
    } else {
      setState({ ...state, phone: { value: "", error: null } });
    }
  };

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
                <Input
                  placeholder="Ex: Famas tokyo marui"
                  id="input-title"
                  onBlur={onBlurTitleInput}
                  error={state.title.error}
                />
                <Input.Message type="error" message={state.title.error} />
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
                <Input.Message type="error" message={state.description.error} />
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
                  formatter={(value) => `${value} €`}
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
                <Input
                  placeholder="+33422424424"
                  type="tel"
                  id="input-phone"
                  style={{ width: "180px" }}
                  onBlur={onBlurPhoneInput}
                  error={state.phone.error}
                />
                <Input.Message type="error" message={state.phone.error} />
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

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: `/auth/connexion?error=RequiredLogin`,
        statusCode: 303
      }
    };
  }

  return {
    props: {
      session: session
    }
  };
}

const mapState = (state) => {
  return {
    categories: state.category.categories
  };
};

const mapDis = {};

export default connect(mapState, mapDis)(AddAnnonce);
