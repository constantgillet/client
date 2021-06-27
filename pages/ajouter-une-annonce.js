import { getSession, useSession } from "next-auth/client";
import api from "../lib/API/api";

export default function AddAnnonce(props) {
  const [session, loading] = useSession();

  return <div>Ajouter une annonce</div>;
}
