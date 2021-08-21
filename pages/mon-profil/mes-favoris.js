import { getSession } from "next-auth/client";
import FavoriteAPI from "../../lib/API/favoritesAPI";
import OfferAPI from "../../lib/API/_offerAPI";

export default function MyFavorites({ favorites }) {
  console.log(favorites);
  return <div>fav</div>;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  try {
    const resp = await new FavoriteAPI(context).getAll(session.user.id);
    let favorites = resp.data.data;

    let offers = [];

    if (favorites) {
      const respOffers = await new OfferAPI().getAllOffer({ offersId: favorites });

      if (respOffers.data.data) {
        offers = respOffers.data.data;
      }
    }

    return {
      props: {
        offers: offers
      }
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        offers: []
      }
    };
  }
}
