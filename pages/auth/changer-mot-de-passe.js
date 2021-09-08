import React, { useState } from "react";
import styled from "styled-components";
import AuthLayout from "../../components/AuthLayout";
import Meta from "../../components/Meta";
import { MainStyle } from "../../styles/style";
import Link from "next/link";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Image from "next/image";
import { forgotPassword } from "../../lib/API/authAPI";
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

export default function ChangePasswordPage() {
  //States password
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  //States password confirm
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState(null);

  const [isPosting, setIsPosting] = useState(false);

  const [canPost, setCanPost] = useState(true);

  /**
   * PASSWORD CONTROLS
   */
  const onBlurPassword = (event) => {
    const _password = event.target.value;

    if (_password.length >= 3) {
      setPassword(_password);
      setPasswordError(null);
    } else {
      setPasswordError("Ce mot de passe n'est pas valide.");
    }
  };

  const onBlurPasswordConfirm = (event) => {
    const _passwordConfirm = event.target.value;

    if (_passwordConfirm !== password) {
      setPasswordConfirmError("La confirmation du mot de passe est invalide.");
    } else {
      setPasswordConfirmError(null);
    }

    setPasswordConfirm(_passwordConfirm);
  };

  const onClickPost = (e) => {
    e.preventDefault();
    if (password.length > 5) {
      setCanPost(false);

      setTimeout(() => {
        setCanPost(true);
      }, 1000 * 30); //30 seconds

      setIsPosting(true);
      forgotPassword(password)
        .then(() => {
          setIsPosting(false);
          message.success("Un mail vous a été envoyé et est valide pendant 20 minutes.");
        })
        .catch((err) => {
          console.error(err);
          setIsPosting(false);
          message.success("Un mail vous a été envoyé et est valide pendant 20 minutes.");
        });
    } else {
    }
  };

  return (
    <>
      <Meta title="Changer le mot de passe | UpGear" />
      <AuthLayout title="Bienvenue sur UpGear" text="Changer le mot de passe">
        <Form method="post">
          <Link href="/">
            <LogoLink>
              <Image src={"/images/logo.png"} width={164} height={31} alt="Upgear logotype" />
            </LogoLink>
          </Link>
          <p>Entrez votre nouveau mot de passe.</p>
          <FormGroup>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Nouveau mot de passe"
              onBlur={onBlurPassword}
              error={passwordError}
            />
            <Input.Message type="error" message={passwordError} />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              id="password-confirm"
              name="password-confirm"
              placeholder="Confirmez le nouveau mot de passe"
              onBlur={onBlurPasswordConfirm}
              error={passwordConfirmError}
            />
            <Input.Message type="error" message={passwordConfirmError} />
          </FormGroup>
          <Button
            htmlType="submit"
            block
            onClick={onClickPost}
            loading={isPosting}
            disabled={
              passwordError ||
              passwordConfirmError ||
              !passwordConfirm.length ||
              !password.length ||
              canPost == false
            }
          >
            Envoyer
          </Button>
        </Form>
      </AuthLayout>
    </>
  );
}
