export const getAllAnnonces = async (params) => {
  const res = await fetch("https://upgear.fr/api/annonces?limit=12", {
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
