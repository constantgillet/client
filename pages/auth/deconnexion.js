import { message } from "antd";
import { signOut } from "next-auth/client";

export default function LogoutPage() {
  signOut({ redirect: true, callbackUrl: "/" });
  message.success("Vous vous êtes déconnecté");

  return <></>;
}
