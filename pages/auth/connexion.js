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

export default function SignIn({ csrfToken }) {
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
            <Input type="email" id="email" name="email" placeholder="Votre email" />
          </FormGroup>
          <FormGroup>
            <Input type="password" id="password" name="password" placeholder="Mot de passe" />
          </FormGroup>

          <Button type="submit" block>
            Se connecter
          </Button>
          <Separator>- OU -</Separator>
          <Link href="/auth/inscription">
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
