import React from "react";
import OfferAPI from "../../lib/api/offerAPI";
import ShippingCategoryAPI from "../../lib/api/shippingCategoryAPI";
import AddAnnonce from "../ajouter-une-annonce";

export default AddAnnonce;

export async function getServerSideProps(context) {
  const { offerId } = context.params;

  try {
    const resp = await new OfferAPI().getOneOffer(offerId);

    const offer = resp.data.data;

    const respPhone = await new OfferAPI(context).getOfferPhone(offerId);

    if (respPhone.data?.data) {
      offer.phone = respPhone.data.data;
    }

    // will be passed to the page component as props
    return {
      props: {
        offer: offer
      }
    };
  } catch (error) {
    context.res.statusCode = 404;
    return {
      props: { myStatusCode: 404, error: `couldn't find the offer` } // will be passed to the page component as props
    };
  }
}
