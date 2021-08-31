import React, { useState } from "react";
import Main from "../../components/Main";
import Meta from "../../components/Meta";
import ProfileLayout from "../../components/ProfileLayout";
import Container from "../../components/Container";
import ProfileBanner from "../../components/ProfileBanner";
import styled from "styled-components";
import { MainStyle } from "../../styles/style";
import Button from "../../components/Button";
import { Col, Row, Upload } from "antd";
import Input from "../../components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/fontawesome-free-solid";

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

export default function MyProfile() {
  const [profileData, setProfileData] = useState({
    profilePicture: { value: null, error: null, imageSrc: null, isModified: false },
    bannerPicture: { value: null, error: null, imageSrc: null, isModified: false },
    location: { value: "", error: null, isModified: false },
    teamName: { value: "", error: null, isModified: false },
    description: { value: "", error: null, isModified: false }
  });

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

  return (
    <Main>
      <Meta title="Mon profil | Upgear" />
      <Container>
        <ProfileLayout>
          <ProfileBanner showButton />
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
                <Description id="input-description" placeholder="Description" />
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
