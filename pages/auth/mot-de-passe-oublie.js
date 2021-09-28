import React, { useState } from "react";
import styled from "styled-components";
import AuthLayout from "../../components/AuthLayout";
import Meta from "../../components/Meta";
import { MainStyle } from "../../styles/style";
import Link from "next/link";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Image from "next/image";
import { forgotPassword } from "../../lib/api/authAPI";
import { message } from "antd";

const Form = styled.form`
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto auto;
  animation: translateDown 0.5s ease 0s forwards;
  text-align: center;
`;

const LogoLink = styled.a`
  display: block;
  margin-bottom: ${MainStyle.space.xl}px;
`;

const FormGroup = styled.div`
  margin-bottom: ${MainStyle.space.m}px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Separator = styled.span`
  display: block;
  color: ${MainStyle.color.dark};
  text-align: center;
  margin: ${MainStyle.space.l}px auto;
`;

export default function ForgotPassword() {
  //States email
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);

  const [isPosting, setIsPosting] = useState(false);

  const [canPost, setCanPost] = useState(true);

  /**
   * EMAIL CONTROLS
   */
  const onBlurEmail = (event) => {
    const _email = event.target.value;

    const regex =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (regex.test(_email)) {
      setEmail(_email);
      setEmailError(null);
    } else {
      setEmailError("Cet email n'est pas valide");
    }
  };

  const onClickPost = (e) => {
    e.preventDefault();
    if (email.length > 5) {
      setCanPost(false);

      setTimeout(() => {
        setCanPost(true);
      }, 1000 * 30); //30 seconds

      setIsPosting(true);
      forgotPassword(email)
        .then(() => {
          setIsPosting(false);
          message.success("Un mail vous a été envoyé et est valide pendant 20 minutes.", 10);
        })
        .catch((err) => {
          console.error(err);
          setIsPosting(false);
          message.success("Un mail vous a été envoyé et est valide pendant 20 minutes.", 10);
        });
    } else {
    }
  };

  return (
    <>
      <Meta title="Mot de passe oublié | UpGear" />
      <AuthLayout title="Bienvenue sur UpGear" text="Mot de passe oublié">
        <Form method="post">
          <Link href="/">
            <LogoLink>
              <Image src={"/images/logo.png"} width={164} height={31} alt="Upgear logotype" />
            </LogoLink>
          </Link>
          <p>Afin de changer votre mot de passe nous vous enverrons un email. Merci de vérifier vos spams.</p>
          <FormGroup>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Votre email"
              onBlur={onBlurEmail}
              error={emailError}
            />
            <Input.Message type="error" message={emailError} />
          </FormGroup>
          <Button
            htmlType="submit"
            block
            onClick={onClickPost}
            loading={isPosting}
            disabled={emailError || !email.length || canPost == false}
          >
            Envoyer
          </Button>
          <Separator>- OU -</Separator>
          <Link href="/auth/mot-de-passe-oublie">
            <a title="J'ai oublié mon mot de passe">
              <Button block type="link">
                J'ai oublié mon mot de passe
              </Button>
            </a>
          </Link>
          <Link href="/auth/inscription">
            <a title="Créer un compte">
              <Button block type="link">
                Créer un compte
              </Button>
            </a>
          </Link>
        </Form>
      </AuthLayout>
    </>
  );
}
