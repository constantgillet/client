import Head from "next/head";
import styled from "styled-components";
import AuthLayout from "../../components/AuthLayout";
import Link from "next/link";
import Image from "next/image";
import { MainStyle } from "../../styles/style";
import Input from "../../components/Input";
import { message, Tooltip } from "antd";
import { faInfo, faInfoCircle } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import { useState } from "react";
import { registerUser } from "../../lib/API/authAPI.JS";
import Router from "next/router";

const RegisterForm = styled.form`
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

const ConfirmCheckbox = styled(Checkbox)`
  margin-bottom: ${MainStyle.space.m}px;
  text-align: left;
`;

const FormGroup = styled.div`
  margin-bottom: ${MainStyle.space.m}px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ErrorInputMessage = styled.span`
  color: ${MainStyle.color.danger};
  font-size: ${MainStyle.text.small.fontSize};
  margin-top: ${MainStyle.space.xs}px;
  text-align: left;
`;

const Separator = styled.span`
  display: block;
  color: ${MainStyle.color.dark};
  text-align: center;
  margin: ${MainStyle.space.l}px auto;
`;

export default function Register({ csrfToken }) {
  //States pseudos
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null);

  //States email
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);

  //Sates password
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  //Sates password confirm
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState(null);

  const [acceptConditions, setAcceptConditions] = useState(false);

  //Posting state
  const [isPosting, setIsPosting] = useState(false);

  /**
   * username CONTROLS
   */
  const onUsernameChange = (event) => {
    const _pseudo = event.target.value;

    if (_pseudo.length < 15) {
      const regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;

      if (!regex.test(_pseudo)) {
        setUsername(_pseudo);
        setUsernameError(null);
      }
    }
  };

  const onBlurUsername = (event) => {
    const _pseudo = event.target.value;

    if (_pseudo.length > 2) {
      setUsernameError(null);
    } else {
      setUsernameError("Le pseudo est trop court.");
    }
  };

  /**
   * EMAIL CONTROLS
   */
  const onChangeEmail = (event) => {
    const _email = event.target.value;

    if (_email.length < 254) {
      setEmail(_email);
    }
  };

  const onBlurEmail = (event) => {
    const _email = event.target.value;

    const regex =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (regex.test(_email)) {
      setEmailError(null);
    } else {
      setEmailError("Cet email n'est pas valide");
    }
  };

  /**
   * PASSWORD CONTROLS
   */
  const onChangePassword = (event) => {
    const _password = event.target.value;
    setPassword(_password);
    setPasswordError(null);
  };

  const onBlurPassword = (event) => {
    const _password = event.target.value;

    if (_password.length > 4) {
      setPasswordError(null);
    } else {
      setPasswordError("Le mot de passe doit faire au moins 5 caractères");
    }
  };

  /**
   * PASSWORD CONFIRM PASSWORD
   */
  const onBlurPasswordConfirm = (event) => {
    const _passwordConfirm = event.target.value;
    setPasswordConfirm(_passwordConfirm);

    if (_passwordConfirm === password) {
      setPasswordConfirmError(null);
    } else {
      setPasswordConfirmError("Les mots de passe ne correspondent pas");
    }
  };

  /**
   * CHECK ALL FIELDS
   */
  const onRegisterClick = (event) => {
    event.preventDefault();

    if (
      username.length > 3 &&
      email.length > 5 &&
      password.length > 4 &&
      passwordConfirm.length > 4 &&
      acceptConditions
    ) {
      if (
        usernameError == null &&
        emailError == null &&
        passwordError == null &&
        passwordConfirmError == null
      ) {
        console.log("ok");
        postData();
      }
    }
  };

  const postData = async () => {
    setIsPosting(true);

    try {
      const res = await registerUser(username, email, password, passwordConfirm);
      setIsPosting(false);
      message.success("Votre compte a bien été créé");
      Router.push(`/auth/connexion?email=${email}`);
    } catch (error) {
      setIsPosting(false);

      if (error.response) {
        if (error.response.data.errors.username[0]) {
          setUsernameError(error.response.data.errors.username[0]);
        }

        if (error.response.data.errors.email[0]) {
          setEmailError(error.response.data.errors.email[0]);
        }
      } else {
        message.error("Erreur lors de la création du compte, merci de contacter le support");
      }
    }
  };

  return (
    <>
      <Head>
        <title>UpGear | S'inscrire</title>
      </Head>
      <AuthLayout title="Bienvenue sur UpGear" text="Inscrivez vous pour accéder à votre compte ✨">
        <RegisterForm method="post" target="">
          <Link href="/">
            <LogoLink>
              <Image src={"/images/logo.png"} width={164} height={31} alt="Upgear logotype" />
            </LogoLink>
          </Link>
          <FormGroup>
            <Input
              placeholder="Votre pseudo"
              suffix={
                <Tooltip title="Entre 3 et 15 caractères sans caractères spéciaux">
                  <FontAwesomeIcon icon={faInfo} />
                </Tooltip>
              }
              onBlur={onBlurUsername}
              onChange={onUsernameChange}
              value={username}
              error={usernameError}
            />
            {usernameError && <ErrorInputMessage>{usernameError}</ErrorInputMessage>}
          </FormGroup>
          <FormGroup>
            <Input
              placeholder="Votre adresse email"
              className="form-input"
              onBlur={onBlurEmail}
              onChange={onChangeEmail}
              value={email}
              error={emailError}
            />
            {emailError && <ErrorInputMessage>{emailError}</ErrorInputMessage>}
          </FormGroup>
          <FormGroup>
            <Input
              placeholder="Votre mot de passe"
              className="form-input"
              type="password"
              onBlur={onBlurPassword}
              onChange={onChangePassword}
              value={password}
              error={passwordError}
            />
            {passwordError && <ErrorInputMessage>{passwordError}</ErrorInputMessage>}
          </FormGroup>
          <FormGroup>
            <Input
              placeholder="Confirmez le mot de passe"
              className="form-input"
              type="password"
              placeholder="Confirmez le mot de passe"
              onBlur={onBlurPasswordConfirm}
              error={passwordConfirmError}
            />
            {passwordConfirmError && <ErrorInputMessage>{passwordConfirmError}</ErrorInputMessage>}
          </FormGroup>
          <ConfirmCheckbox onChange={(e) => setAcceptConditions(e.target.checked)} checked={acceptConditions}>
            Je reconnais avoir lu et compris les{" "}
            <Link href="/CGU">
              <a title="Lien des conditions générales d'utilisation">conditions générales d'utilisation</a>
            </Link>
            {""} et je les accepte. Je confirme avoir plus de 18 ans.
          </ConfirmCheckbox>
          <Button block loading={isPosting} onClick={onRegisterClick}>
            S'enregistrer
          </Button>
          <Separator>- OU -</Separator>
          <Link href="/auth/connexion">
            <a title="Se connecter">
              <Button block type="link">
                J'ai déjà un compte
              </Button>
            </a>
          </Link>
        </RegisterForm>
      </AuthLayout>
    </>
  );
}
