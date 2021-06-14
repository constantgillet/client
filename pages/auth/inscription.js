import Head from "next/head";

export default function SignIn({ csrfToken }) {
  return (
    <>
      <Head>
        <title>UpGear | S'inscrire</title>
      </Head>
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
    </>
  );
}
