import axios from "axios";
import { getSession } from "next-auth/client";
import { API_URL } from "../constants";

const UserAPI = class {
  constructor(context) {
    this.context = context;
    this.api = axios.create({ baseURL: API_URL });
    this.api.interceptors.request.use(async (config) => {
      const session = await getSession(context);

      if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session?.accessToken}`;
      } else {
        delete config.headers.Authorization;
      }

      return config;
    });
  }

  updateUser = async (location, teamName, description, profilePicture, bannerPicture) => {
    const session = await getSession(context);
    const userId = session?.user?.id;

    const bodyFormData = new FormData();

    if (location) {
      bodyFormData.append("location", location);
    }

    if (teamName) {
      bodyFormData.append("team_name", teamName);
    }

    if (description) {
      bodyFormData.append("description", description);
    }

    if (profilePicture) {
      bodyFormData.append("profile_picture", profilePicture.originFileObj);
    }

    if (bannerPicture) {
      bodyFormData.append("banner_picture", bannerPicture.originFileObj);
    }

    return this.api.patch(`/users/${userId}`, bodyFormData);
  };

  getOneUser = (id) => {
    return this.api.get(`/users/${id}`);
  };
};

export default UserAPI;
