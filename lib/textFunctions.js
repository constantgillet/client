//From number to french price string
export const toReadablePrice = (price) => {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(price);
};
