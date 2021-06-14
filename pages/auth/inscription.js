import Head from "next/head";
import AuthLayout from "../../components/AuthLayout";

export default function SignIn({ csrfToken }) {
  return (
    <>
      <Head>
        <title>UpGear | S'inscrire</title>
      </Head>
      <AuthLayout title="Bienvenue sur UpGear" text="Inscrivez vous pour accéder à votre compte ✨">
        <form method="post" action="/api/auth/callback/credentials">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label>
            Email addresse
            <input type="email" id="email" name="email" />
          </label>
          <label>
            Password
            <input type="password" id="password" name="password" />
          </label>
          <button type="submit">Sign in with Email</button>
        </form>
      </AuthLayout>
    </>
  );
}
