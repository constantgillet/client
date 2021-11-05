import axios from "axios";
import { API_URL } from "../constants";
import api from "./api";

export const createAsset = async (asset, type, customConfig) => {
  const fmData = new FormData();
  const config = customConfig || {
    headers: { "content-type": "multipart/form-data" }
  };

  fmData.append("asset", asset);
  fmData.append("type", type);

  return api.post(`/assets`, fmData, config);
};
