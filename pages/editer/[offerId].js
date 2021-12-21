import React from "react";
import OfferAPI from "../../lib/api/offerAPI";
import ShippingCategoryAPI from "../../lib/api/shippingCategoryAPI";
import AddAnnonce from "../ajouter-une-annonce";

export default AddAnnonce;

export async function getServerSideProps({ params, res }) {
  const { offerId } = params;

  try {
    const resp = await new OfferAPI().getOneOffer(offerId);

    // will be passed to the page component as props
    return {
      props: {
        offer: resp.data.data
      }
    };
  } catch (error) {
    res.statusCode = 404;
    return {
      props: { myStatusCode: 404, error: `couldn't find the offer` } // will be passed to the page component as props
    };
  }
}
