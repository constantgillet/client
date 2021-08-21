import React, { useEffect } from "react";
import { setCategories } from "../redux/actions/categoryActions";
import { connect } from "react-redux";
import { getCategories } from "../lib/API/categoryAPI";
import { useSession } from "next-auth/client";
import { setFavorites } from "../redux/actions/favoriteActions";
import FavoriteAPI from "../lib/API/favoritesAPI";

function DataFetcher(props) {
  const [session, loading] = useSession();

  useEffect(() => {
    getCategories()
      .then((res) => {
        props.setCategories(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!loading && session) {
      new FavoriteAPI()
        .getAll(session?.user?.id)
        .then((res) => {
          const newFavorites = res.data.data;

          if (newFavorites) {
            props.setFavorites(newFavorites);
          } else {
            props.setFavorites([]);
          }
        })
        .catch((err) => console.error(err));
    } else if (!loading && !session) {
      props.setFavorites([]);
    }
  }, [session, loading]);

  return <>{props.children}</>;
}

const mapState = (state) => {
  return {
    categories: state.category.categories
  };
};

const mapDis = {
  setCategories: setCategories,
  setFavorites: setFavorites
};

export default connect(mapState, mapDis)(DataFetcher);
