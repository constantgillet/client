import { API_URL } from "./constants";

export const getAllAnnonces = async (params) => {
  const res = await fetch(API_URL + "/api/annonces?limit=12", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
};
