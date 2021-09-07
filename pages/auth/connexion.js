import { getProviders, signIn } from "next-auth/client";
import { getCsrfToken } from "next-auth/client";
import Head from "next/head";
import styled from "styled-components";
import AuthLayout from "../../components/AuthLayout";
import Button from "../../components/Button";
import { MainStyle } from "../../styles/style";
import Link from "next/link";
import Image from "next/image";
import Input from "../../components/Input";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

export default function SignIn({ csrfToken, ...props }) {
  const { query } = useRouter();
  const { error } = query;

  //States email
  const [email, setEmail] = useState(query.email ? query.email : "");
  const [emailError, setEmailError] = useState(
    error === "CredentialsSignin" ? "Email ou mot de passe invalide" : null
  );

  //Sates password
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  useEffect(() => {
    if (error === "RequiredLogin") {
      message.error("Vous devez être connecté pour accéder à cette page");
    }
  }, []);

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

  /**
   * PASSWORD CONTROLS
   */
  const onBlurPassword = (event) => {
    const _password = event.target.value;

    if (_password.length > 4) {
      setPasswordError(null);
      setPassword(_password);
    } else {
      setPasswordError("Le mot de passe doit faire au moins 5 caractères");
    }
  };

  const onClickPost = (e) => {
    if (email.length < 5 || password.length < 4) {
      e.preventDefault();
    } else if (emailError != null || passwordError != null) {
      e.preventDefault();
    }
  };

  return (
    <>
      <Head>
        <title>Se connecter | UpGear </title>
      </Head>
      <AuthLayout title="Bienvenue sur UpGear" text="Connectez vous pour accéder à votre compte ✨">
        <Form method="post" action="/api/auth/callback/credentials">
          <Link href="/">
            <LogoLink>
              <Image src={"/images/logo.png"} width={164} height={31} alt="Upgear logotype" />
            </LogoLink>
          </Link>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <FormGroup>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Votre email"
              defaultValue={query.email && query.email}
              onBlur={onBlurEmail}
              error={emailError}
            />
            {emailError && <ErrorInputMessage>{emailError}</ErrorInputMessage>}
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Mot de passe"
              onBlur={onBlurPassword}
              error={passwordError}
            />
            {passwordError && <ErrorInputMessage>{passwordError}</ErrorInputMessage>}
          </FormGroup>

          <Button htmlType="submit" block onClick={onClickPost}>
            Se connecter
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

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  };
}
