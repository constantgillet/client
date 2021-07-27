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
