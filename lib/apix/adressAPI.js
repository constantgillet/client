import axios from "axios";

export const searchCities = async (query, limit = 5) => {
  //https://api-adresse.data.gouv.fr/search/?q=${searchQuery}&type=municipality&autocomplete=1&limit=4
  return axios.get("https://api-adresse.data.gouv.fr/search/?type=municipality&autocomplete=1", {
    params: {
      q: query,
      limit: limit
    }
  });
};
