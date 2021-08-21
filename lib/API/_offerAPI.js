import axios from "axios";
import { getSession } from "next-auth/client";
import { API_URL } from "../constants";

const OfferAPI = class {
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

  createOffer = (title, description, category, price, location, phoneNumber, shippingCategory, images) => {
    const bodyFormData = new FormData();

    bodyFormData.append("title", title);
    bodyFormData.append("description", description);
    bodyFormData.append("category", category);
    bodyFormData.append("price", price);
    bodyFormData.append("location", location);
    bodyFormData.append("phone_number", phoneNumber);
    bodyFormData.append("shipping_category", shippingCategory);

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      bodyFormData.append("image", image.originFileObj);
    }

    return this.api.post("/offers", bodyFormData);
  };

  getOneOffer = (id) => {
    return this.api.get(`/offers/${id}`);
  };

  buyOffer = (id) => {
    return this.api.post(`/offers/${id}/buy`);
  };
  //query, limit, page, orderBy, category, department

  /**
   *
   * @param {Object} params Options for the query
   * @param {Object} params.query Query
   * @param {Object} params.limit Limit of the query
   * @param {Object} params.page Page
   * @param {Object} params.orderBy Order result, default -> id_desc
   * @param {Object} params.category Category
   * @param {Object} params.department Department
   * @param {Array} params.offersId Array of offers ids
   *
   */
  getAllOffer = (params) => {
    const customParams = new URLSearchParams();

    params?.offersId?.forEach((element) => {
      customParams.append("offer_id", element);
    });

    return this.api.get("/offers", {
      params: {
        ...customParams,
        query: params.query,
        order_by: params.orderBy,
        category: params.category,
        department: params.department,
        limit: params.limit,
        page: params.page
      }
    });
  };
};

export default OfferAPI;
