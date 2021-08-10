import api from "./api";

export const createOffer = (
  title,
  description,
  category,
  price,
  location,
  phoneNumber,
  shippingCategory,
  images
) => {
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

  return api.post("/offers", bodyFormData);
};

export const getOneOffer = (id) => {
  return api.get(`/offers/${id}`);
};

export const buyOffer = (id) => {
  return api.post(`/offers/${id}/buy`);
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
 *
 */
export const getAllOffer = (params) => {
  return api.get("/offers", {
    params: {
      query: params.query,
      order_by: params.orderBy,
      category: params.category,
      department: params.department,
      limit: params.limit,
      page: params.page
    }
  });
};
