import React, { useState } from "react";
import Main from "../../components/Main";
import Meta from "../../components/Meta";
import ProfileLayout from "../../components/ProfileLayout";
import Container from "../../components/Container";
import ProfileBanner from "../../components/ProfileBanner";
import styled from "styled-components";
import { MainStyle } from "../../styles/style";
import Button from "../../components/Button";
import { Col, message, Row, Upload } from "antd";
import Input from "../../components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/fontawesome-free-solid";
import UserAPI from "../../lib/API/userAPI";
import { getSession } from "next-auth/client";
import { API_IMAGES_PATH } from "../../lib/constants";

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

const Description = styled(TextAera)`
  min-height: 100px !important;
`;

const ProfileImageUpload = styled(Upload)`
  .ant-upload {
    width: 128px;
    height: 128px;
    border-radius: 50%;
    display: flex;

    &:hover {
      border-color: ${MainStyle.color.primary};
    }
  }
`;

const ProfileImagePreview = styled.div`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
`;

const BannerImagePreview = styled.div`
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  border-radius: ${MainStyle.radius.m}px;
`;

const BannerImageUpload = styled(Upload)`
  .ant-upload {
    width: 100%;
    height: 128px;
    border-radius: ${MainStyle.radius.m}px;

    &:hover {
      border-color: ${MainStyle.color.primary};
    }
  }
`;

export default function MyProfile({ user }) {
  const [profileData, setProfileData] = useState({
    profilePicture: {
      value: null,
      error: null,
      imageSrc: user?.profile_picture.length ? API_IMAGES_PATH + user?.profile_picture : null,
      isModified: false
    },
    bannerPicture: {
      value: null,
      error: null,
      imageSrc: user?.banner_picture.length ? API_IMAGES_PATH + user?.banner_picture : null,
      isModified: false
    },
    location: { value: user.location ? user.location : "", error: null, isModified: false },
    teamName: { value: user.team_name ? user.team_name : "", error: null, isModified: false },
    description: { value: user.description ? user.description : "", error: null, isModified: false }
  });

  const [isPosting, setIsPosting] = useState(false);

  const uploadButton = (
    <div>
      <FontAwesomeIcon icon={faPlus} />
      <div style={{ marginTop: 8 }}>Ajouter</div>
    </div>
  );

  const beforeUploadProfilePicture = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      console.log(e);
      setProfileData({
        ...profileData,
        profilePicture: { ...profileData.profilePicture, imageSrc: e.target.result }
      });
    };
    reader.readAsDataURL(file);

    // Prevent upload
    return false;
  };

  const beforeUploadBannerPicture = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      setProfileData({
        ...profileData,
        bannerPicture: { ...profileData.bannerPicture, imageSrc: e.target.result }
      });
    };
    reader.readAsDataURL(file);

    // Prevent upload
    return false;
  };

  /**
   * LOCATION
   */
  const onChangeLocationInput = (e) => {
    setProfileData({
      ...profileData,
      location: { ...profileData.description, value: e.target.value, isModified: true }
    });
  };

  const onBlurLocationInput = (e) => {
    const _location = e.target.value;

    if (_location.length == 0) {
      return setProfileData({
        ...profileData,
        location: { ...profileData.location, error: null }
      });
    }

    if (_location.length < 3) {
      return setProfileData({
        ...profileData,
        location: { ...profileData.location, error: "Votre localisation n'est pas assez longue" }
      });
    }

    if (_location.length > 24) {
      return setProfileData({
        ...profileData,
        location: { ...profileData.location, error: "Votre localisation est trop longue" }
      });
    }

    return setProfileData({
      ...profileData,
      location: { ...profileData.location, error: null }
    });
  };

  /**
   * TEAM NAME
   */
  const onChangeTeamNameInput = (e) => {
    setProfileData({
      ...profileData,
      teamName: { ...profileData.description, value: e.target.value, isModified: true }
    });
  };

  const onBlurTeamNameInput = (e) => {
    const _teamName = e.target.value;

    if (_teamName.length == 0) {
      return setProfileData({
        ...profileData,
        teamName: { ...profileData.teamName, error: null }
      });
    }

    if (_teamName.length < 3) {
      return setProfileData({
        ...profileData,
        teamName: { ...profileData.teamName, error: "Le nom de de l'équipe est trop court" }
      });
    }

    if (_teamName.length > 24) {
      return setProfileData({
        ...profileData,
        teamName: { ...profileData.teamName, error: "Le nom de de l'équipe est trop long" }
      });
    }

    setProfileData({
      ...profileData,
      teamName: { ...profileData.teamName, error: null }
    });
  };

  /**
   * DESCRIPTION
   */
  const onChangeDescriptionInput = (e) => {
    setProfileData({
      ...profileData,
      description: { ...profileData.description, value: e.target.value, isModified: true }
    });
  };

  const onBlurDescriptionInput = (e) => {
    const _description = e.target.value;

    if (_description.length == 0) {
      return setProfileData({
        ...profileData,
        description: { ...profileData.description, error: null }
      });
    }

    if (_description.length > 200) {
      return setProfileData({
        ...profileData,
        description: { ...profileData.description, error: "Votre description est trop longue" }
      });
    }

    return setProfileData({
      ...profileData,
      description: { ...profileData.description, error: null }
    });
  };

  const onButtonClick = () => {
    setIsPosting(true);
    console.log(user.id);
    new UserAPI()
      .updateUser(
        user.id,
        profileData.location.value,
        profileData.teamName.value,
        profileData.description.value
      )
      .then((res) => {
        setIsPosting(false);
        message.success("Le profil a été sauvegardé");
      })
      .catch((err) => {
        setIsPosting(false);
        message.error("Erreur lors de la sauvegarde du profil");
        console.error(err);
      });
  };

  return (
    <Main>
      <Meta title="Mon profil | Upgear" />
      <Container>
        <ProfileLayout>
          <ProfileBanner
            profilePicture={user?.profile_picture.length ? API_IMAGES_PATH + user?.profile_picture : null}
            bannerPicture={user?.banner_picture.length ? API_IMAGES_PATH + user?.banner_picture : null}
            showButton
          />
          <CardSection>
            <CardTitle>Profil</CardTitle>
            <FormPartRow gutter={MainStyle.gutter}>
              <Col span={24} md={8}>
                <Label htmlFor="input-location">Photo de profil</Label>
                <ProfileImageUpload
                  name="avatar"
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={beforeUploadProfilePicture}
                  onChange={({ file: newFile }) => {
                    setProfileData({
                      ...profileData,
                      profilePicture: { ...profileData.profilePicture, value: newFile, isModified: true }
                    });
                  }}
                >
                  {profileData.profilePicture.imageSrc ? (
                    <ProfileImagePreview
                      style={{ backgroundImage: `url(${profileData.profilePicture.imageSrc})` }}
                    ></ProfileImagePreview>
                  ) : (
                    uploadButton
                  )}
                </ProfileImageUpload>
              </Col>
              <Col span={24} md={16}>
                <Label htmlFor="input-location">Bannière du profil</Label>
                <BannerImageUpload
                  name="avatar"
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={beforeUploadBannerPicture}
                  onChange={({ file: newFile }) => {
                    setProfileData({
                      ...profileData,
                      bannerPicture: { ...profileData.bannerPicture, value: newFile, isModified: true }
                    });
                  }}
                >
                  {profileData.bannerPicture.imageSrc ? (
                    <BannerImagePreview
                      style={{ backgroundImage: `url(${profileData.bannerPicture.imageSrc})` }}
                    ></BannerImagePreview>
                  ) : (
                    uploadButton
                  )}
                </BannerImageUpload>
              </Col>
            </FormPartRow>
            <FormPartRow gutter={MainStyle.gutter}>
              <Col span={24} md={12}>
                <Label htmlFor="input-location">Localisation publique</Label>
                <Input
                  id="input-location"
                  placeholder="Localisation publique"
                  value={profileData.location.value}
                  onBlur={onBlurLocationInput}
                  onChange={onChangeLocationInput}
                  error={profileData.location.error}
                />
                <Input.Message type="error" message={profileData.location.error} />
              </Col>
              <Col span={24} md={12}>
                <Label htmlFor="input-team">Team /équipe</Label>
                <Input
                  id="input-team"
                  placeholder="Votre team / équipe"
                  value={profileData.teamName.value}
                  onBlur={onBlurTeamNameInput}
                  onChange={onChangeTeamNameInput}
                  error={profileData.teamName.error}
                />
                <Input.Message type="error" message={profileData.teamName.error} />
              </Col>
            </FormPartRow>
            <FormPartRow gutter={MainStyle.gutter}>
              <Col span={24}>
                <Label htmlFor="input-description">Description</Label>
                <Description
                  id="input-description"
                  placeholder="Description"
                  value={profileData.description?.value}
                  onBlur={onBlurDescriptionInput}
                  onChange={onChangeDescriptionInput}
                  error={profileData.description.error}
                />
                <Input.Message type="error" message={profileData.description.error} />
              </Col>
            </FormPartRow>
            <CardBottom>
              <Button loading={isPosting} onClick={onButtonClick}>
                Sauvegarder
              </Button>
            </CardBottom>
          </CardSection>
        </ProfileLayout>
      </Container>
    </Main>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  try {
    const resp = await new UserAPI(context).getOneUser(session.user.id);
    const user = resp.data.data;

    return {
      props: {
        user: user
      }
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        user: null
      }
    };
  }
}
