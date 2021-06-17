import Head from "next/head";
import styled from "styled-components";
import AuthLayout from "../../components/AuthLayout";
import Link from "next/link";
import Image from "next/image";
import { MainStyle } from "../../styles/style";
import TextInput from "../../components/TextInput";

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

export default function SignIn({ csrfToken }) {
  return (
    <>
      <Head>
        <title>UpGear | S'inscrire</title>
      </Head>
      <AuthLayout title="Bienvenue sur UpGear" text="Inscrivez vous pour accéder à votre compte ✨">
        <RegisterForm method="post">
          <Link href="/">
            <LogoLink>
              <Image src={"/images/logo.png"} width={164} height={31} alt="Upgear logotype" />
            </LogoLink>
          </Link>
          <TextInput placeholder="Pseudo" />
        </RegisterForm>
      </AuthLayout>
    </>
  );
}
