import React, { useEffect } from "react";
import { setCategories } from "../redux/actions/categoryActions";
import { connect } from "react-redux";
import { getCategories } from "../lib/API/categoryAPI";

function DataFetcher(props) {
  useEffect(() => {
    getCategories()
      .then((res) => {
        props.setCategories(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return <>{props.children}</>;
}

const mapState = (state) => {
  return {
    categories: state.category.categories
  };
};

const mapDis = {
  setCategories: setCategories
};

export default connect(mapState, mapDis)(DataFetcher);
