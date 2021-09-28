import { message } from "antd";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { verifyEmail } from "../../lib/api/authAPI";

export default function verification(props) {
  const { error } = props;
  const router = useRouter();

  useEffect(async () => {
    if (error) {
      message.error("La verification de l'email a expirée ou n'est pas valide, merci de réesayer.");
    } else {
      getSession().then((session) => {
        message.success("Votre email a été vérifié");
        router.push("/");
      });
    }
  }, [props]);

  return null;
}

export async function getServerSideProps({ query }) {
  let error = null;

  const { hash } = query;

  try {
    await verifyEmail(hash);
  } catch (err) {
    error = err;
    console.error(error);
  }

  return {
    props: {
      error: error ? true : false
    }
  };
}
