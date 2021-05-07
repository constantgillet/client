import { getProviders, signIn } from 'next-auth/client'
import { getCsrfToken } from 'next-auth/client'
import Head from 'next/head'

export default function SignIn({ csrfToken }) {


    return (
        <>
            <Head>
                <title>UpGear | Se connecter</title>
            </Head>
            <form method='post' action='/api/auth/callback/credentials'>
                <input name='csrfToken' type='hidden' defaultValue={csrfToken}/>
                <label>
                    Email address
                    <input type='email' id='email' name='email'/>
                </label>
                <label>
                    Password
                    <input type='password' id='password' name='password'/>
                </label>
                <button type='submit'>Sign in with Email</button>
            </form>
        </>
    )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
    return {
      props: {
        csrfToken: await getCsrfToken(context)
      }
    }
  }