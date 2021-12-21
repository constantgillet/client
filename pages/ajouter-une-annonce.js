import { getSession, useSession } from "next-auth/client";
import api from "../lib/api/api";
import Main from "../components/Main";
import styled from "styled-components";
import Container from "../components/Container";
import { Row, Col, message, Upload, Progress } from "antd";
import { MainStyle } from "../styles/style";
import { useEffect, useState } from "react";
import Separator from "../components/Separator";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";
import Image from "next/dist/client/image";
import { connect } from "react-redux";
import { searchCities } from "../lib/api/adressAPI";
import Radio from "../components/Radio";
import Modal from "../components/Modal";
import { useRouter } from "next/dist/client/router";
import Meta from "../components/Meta";
import OfferAPI from "../lib/api/offerAPI";
import { createAsset } from "../lib/api/assetsAPI";

const { Option, OptGroup } = Select;

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

const SeeTipsButton = styled.span`
  color: ${MainStyle.color.primary};
  cursor: pointer;
`;

const FormPart = styled.div`
  padding: ${MainStyle.space.l}px;
`;

const UploadElement = styled(Upload)`
  .ant-upload-list-picture-card-container,
  .ant-upload-select-picture-card {
    width: 132px !important;
    height: 132px !important;
    border-radius: ${MainStyle.radius.s}px;

    .ant-upload-list-item {
      border-radius: ${MainStyle.radius.s}px;
    }
  }

  .ant-upload-select-picture-card:hover {
    border-color: ${MainStyle.color.primary};
  }
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
  const { categories, offer } = props;

  const router = useRouter();

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        onProgress({ percent: (event.loaded / event.total) * 100 });
      }
    };

    try {
      const res = await createAsset(file, "offer", config);

      onSuccess(res.data.data, file);
    } catch (err) {
      console.error("Eroor: ", err);
      const error = new Error("Some error");
      onError({ err });
    }
  };

  const [state, setState] = useState({
    locationOptions: [],
    images: [],
    title: {
      value: offer?.title ? offer?.title : "",
      error: null
    },
    description: {
      value: offer?.description ? offer?.description : "",
      error: null
    },
    category: offer?.category ? offer?.category : null,
    price: {
      value: offer?.price ? offer?.price : "",
      error: null
    },
    location: null,
    shippingCategory: offer?.shipping_category ? offer?.shipping_category : null,
    phone: {
      value: "",
      error: null
    }
  });
  const [isPosting, setIsPosting] = useState(false);

  const [isFetchingCities, setIsFecthingCities] = useState(false);

  const [cities, setCities] = useState([]);

  const [showTipModal, setShopTipModal] = useState(false);

  const [progress, setProgress] = useState(0);

  /** IMAGES */

  const beforeUploadImage = (file) => {
    //limit 5000 KO
    const limit = file.size / 1024 < 5000;

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      message.error(`${file.name} n'est pas un fichier png ou jpeg`);
    }

    if (!limit) {
      message.error(`${file.name} fait plus de 5 MO`);
    }

    return file.type === "image/png" || (file.type === "image/jpeg" && limit) ? true : Upload.LIST_IGNORE;
  };

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

    //If length is more than 3 we continue
    if (_description.length > 3) {
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
   * PRICE CHECK
   */
  const onBlurPriceInput = (e) => {
    let _price = e.target.value;

    _price = _price.replace("€", "");
    _price = _price.replace(" ", "");

    //If length is more than 0 we continue
    if (_price.length > 0) {
      //If length is less than 30 we continue
      if (_price.length < 30) {
        if (convertToValidPrice(_price)) {
          _price = convertToValidPrice(_price);

          setState({ ...state, price: { value: _price, error: null } });
        } else {
          setState({
            ...state,
            price: { value: _price, error: "Le prix doit être un prix valide entre 1,00 et 2000,00" }
          });
        }
      } else {
        setState({ ...state, price: { value: _price, error: "Le prix est invalide" } });
      }
    } else {
      setState({ ...state, price: { value: _price, error: "Vous devez mettre un prix" } });
    }
  };

  const convertToValidPrice = (_price) => {
    let priceFormated = _price;

    const regex = /^[0-9.,]+$/;

    //test if contains only numbers , , and .
    if (regex.test(_price)) {
      //Replace , by .
      priceFormated = _price.replace(",", ".");

      //Check is first caracter and the last one are not .
      if (priceFormated[0] != "." && priceFormated[priceFormated.length - 1] != ".") {
        //Check if contains less than two .
        if (priceFormated.split(".").length - 1 <= 1) {
          if (countDecimals(priceFormated) < 3) {
            priceFormated = parseFloat(priceFormated);

            if (priceFormated > 0.99 && priceFormated < 2000) {
              return priceFormated;
            }
          }
        }
      }
    }

    return false;
  };

  const countDecimals = (value) => {
    if (value % 1 != 0) return value.toString().split(".")[1].length;
    return 0;
  };

  /**
   * On city search
   */
  const onCitySearch = async (val) => {
    if (!val.length) {
      return setCities([]);
    }

    try {
      setIsFecthingCities(true);
      const res = await searchCities(val);
      setIsFecthingCities(false);

      const newCities = res.data.features.map((feature) => feature.properties);
      setCities(newCities);
    } catch (error) {}
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

  const onClickPostButton = () => {
    if (
      state.title.value.length > 0 &&
      state.images.length > 0 &&
      state.description.value.length > 0 &&
      state.category &&
      state.price.value > 0 &&
      state.location &&
      state.shippingCategory &&
      state.phone.value.length > 0
    ) {
      if (!state.title.error && !state.description.error && !state.price.error && !state.phone.error) {
        setIsPosting(true);

        const images = [];

        state.images.forEach((image) => images.push(image.response?.id));

        new OfferAPI()
          .createOffer(
            state.title.value,
            state.description.value,
            state.category,
            state.price.value,
            state.location,
            state.phone.value,
            state.shippingCategory,
            images
          )
          .then(() => {
            setIsPosting(false);
            message.success("L'annonce a bien été ajoutée");
            router.push("/");
          })
          .catch((err) => {
            console.error(err);
            setIsPosting(false);
            message.error("Erreur lors de l'ajout de votre annonce, merci de contacter le support");
          });

        //postData();
      } else {
        message.error("Vous devez compléter tous les champs obligatoires.");
      }
    } else {
      message.error("Vous devez compléter tous les champs obligatoires.");
    }
  };

  return (
    <Main>
      <Meta title={offer?.id ? "Editer une annonce" : "Ajouter une annonce airsoft"} />
      <Container style={{ paddingTop: MainStyle.space.l + "px", paddingBottom: MainStyle.space.xl + "px" }}>
        <FormSection style={{ marginTop: "0px" }}>
          <FormPart style={{ paddingBottom: "0px" }}>
            <MainTitle> Ajouter une annonce</MainTitle>
            Ajoutez jusqu’à 6 photos -{" "}
            <SeeTipsButton onClick={() => setShopTipModal(true)}>Voir les astuces</SeeTipsButton>
          </FormPart>
          <Modal
            title="Conseils pour les photos"
            visible={showTipModal}
            cancelText="Fermer"
            onCancel={() => setShopTipModal(false)}
          >
            <ul>
              <li className="text-body">Mettez des photos en format paysage </li>
              <li className="text-body">Ne prennez pas des photos trop proches car la photo sera rognée </li>
              <li className="text-body">Prendre des photos dans un endroit lumineux</li>
              <li className="text-body">Ajouter le maximum de photos dont vous disposez </li>
            </ul>
          </Modal>
          <FormPart>
            <UploadElement
              listType="picture-card"
              fileList={state.images}
              onChange={({ file, fileList: newFileList }) => {
                setState({ ...state, images: newFileList });
              }}
              customRequest={uploadImage}
              beforeUpload={beforeUploadImage}
              accept="image/png, image/jpeg"
              maxCount={6}
            >
              {state.images.length < 6 && "+ Uploader"}
            </UploadElement>
          </FormPart>
        </FormSection>

        <FormSection>
          <FormPart>
            <Row gutter={30}>
              <Col span={24} md={12}>
                <InputLabel htmlFor="input-title">Titre de l'annonce * :</InputLabel>
              </Col>
              <Col span={24} md={12}>
                <Input
                  value={state.title.value}
                  placeholder="Ex: Famas tokyo marui"
                  id="input-title"
                  onChange={(e) => setState({ ...state, title: { ...state.title, value: e.target.value } })}
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
                <InputLabel htmlFor="input-description">Description de l'annonce * :</InputLabel>
              </Col>
              <Col span={24} md={12}>
                <Input.TextAera
                  value={state.description.value}
                  placeholder="Ex: Utilisé pendant une dizaine de partie, très bon état"
                  id="input-description"
                  autoSize={{ minRows: 4 }}
                  onChange={(e) =>
                    setState({ ...state, description: { ...state.description, value: e.target.value } })
                  }
                  onBlur={onBlurDescriptionInput}
                  error={state.description.error}
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
                <InputLabel htmlFor="input-category">Catégorie * :</InputLabel>
              </Col>
              <Col span={24} md={12}>
                <Select
                  value={state.category}
                  placeholder="Choisissez une catégorie"
                  style={{ width: "100%" }}
                  onChange={(val) => setState({ ...state, category: val })}
                  id="input-category"
                >
                  {categories?.map((category, index) => {
                    return (
                      <OptGroup key={index} label={category.label}>
                        {category.subcategories?.map((subcategory) => (
                          <Option key={subcategory.name} value={subcategory.name}>
                            {subcategory.label}
                          </Option>
                        ))}
                      </OptGroup>
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
                <InputLabel htmlFor="input-price">Prix de l'annonce * :</InputLabel>
              </Col>
              <Col span={24} md={12}>
                <Input
                  value={state.price.value}
                  placeholder="120,00€"
                  id="input-price"
                  type="number"
                  style={{ width: "120px" }}
                  onBlur={onBlurPriceInput}
                  onChange={(e) => setState({ ...state, price: { ...state.price, value: e.target.value } })}
                  error={state.price.error}
                />
                <Input.Message type="error" message={state.price.error} />
              </Col>
            </Row>
          </FormPart>
        </FormSection>

        <FormSection>
          <FormPart>
            <Row gutter={30}>
              <Col span={24} md={12}>
                <InputLabel htmlFor="input-location">Votre ville * :</InputLabel>
              </Col>
              <Col span={24} md={12}>
                <Select
                  id="input-location"
                  placeholder="Entrez votre ville"
                  showSearch
                  defaultActiveFirstOption={false}
                  filterOption={false}
                  style={{ width: "100%" }}
                  onSearch={onCitySearch}
                  loading={isFetchingCities}
                  onChange={(val) => setState({ ...state, location: val })}
                  autoComplete="dontshow"
                >
                  {cities.map((city, index) => (
                    <Option key={index} value={city.name + " " + city.postcode}>
                      {city.label} ({city.postcode})
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </FormPart>

          <Separator />

          <FormPart>
            <Row gutter={30}>
              <Col span={24} md={12}>
                <InputLabel htmlFor="input-shipping-category">Catégorie de la livraion * :</InputLabel>
                <p>
                  Vendez facilement et plus rapidement vos équipements grâce à notre partenaire
                  <ObvyLogo />.
                </p>
                <p>Vous ne payerez aucune commission.</p>
              </Col>
              <Col span={24} md={12}>
                <Radio.Group
                  id="input-shipping-category"
                  name="radiogroup"
                  buttonStyle="solid"
                  defaultValue={1}
                  onChange={(e) => setState({ ...state, shippingCategory: e.target.value })}
                >
                  <Radio.Button value={"small"}>S (max. 2kg)</Radio.Button>
                  <Radio.Button value={"medium"}>M (max. 5kg) </Radio.Button>
                  <Radio.Button value={"large"}>L (max. 10kg) </Radio.Button>
                  <Radio.Button value={"extralarge"}>XL (max. 15kg) </Radio.Button>
                </Radio.Group>
              </Col>
            </Row>
          </FormPart>

          <Separator />

          <FormPart>
            <Row gutter={30}>
              <Col span={24} md={12}>
                <InputLabel htmlFor="input-phone">Numéro de téléphone (obligatoire) * :</InputLabel>
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
          <Button onClick={onClickPostButton} loading={isPosting}>
            Ajouter l'annonce
          </Button>
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
