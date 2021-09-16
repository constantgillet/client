import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Input from "../components/Input";
import { MainStyle } from "../styles/style";
import Select from "./Select";
import departments from "../docs/departments.json";
import { useRouter } from "next/dist/client/router";

const regions = [];
getRegions();

function getRegions() {
  departments.forEach((department) => {
    const region = { regionCode: department.regionCode, regionName: department.regionName };

    if (!regions.some((_region) => _region.regionCode === region.regionCode)) {
      regions.push(region);
    }
  });
}

const { Option, OptGroup } = Select;

const Title = styled.h2`
  text-align: center;
`;

const SearchFiltersElement = styled.aside`
  background: white;
  padding: ${MainStyle.space.m}px;
  border-radius: ${MainStyle.radius.m}px;
  position: sticky;
  top: 84px;
  z-index: 2;
`;

const InputSearch = styled(Input)`
  margin-bottom: 12px;
`;

const SelectElement = styled(Select)`
  margin-bottom: 12px;
`;

function SearchFilters({ categories }) {
  const router = useRouter();

  const [regionValue, setRegionValue] = useState(null);
  const [departmentValues, setDepartmentValues] = useState(router?.query?.departement || []);
  useEffect(() => {
    //router.push("/offers");
    return () => {
      console.log("unmount");
    };
  }, []);
  return (
    <SearchFiltersElement>
      <Title>Filtres</Title>
      <InputSearch placeholder="Votre recherche" />
      <SelectElement
        placeholder="Choisissez une catégorie"
        style={{ width: "100%" }}
        onChange={(val) => console.log(val)}
        id="input-category"
        getPopupContainer={(element) => element.parentNode}
      >
        {categories?.map((category, index) => {
          return (
            <OptGroup key={index} label={category.label}>
              {category.subcategories.map((subcategory) => (
                <Option key={subcategory.name} value={subcategory.name}>
                  {subcategory.label}
                </Option>
              ))}
            </OptGroup>
          );
        })}
      </SelectElement>
      <SelectElement
        placeholder="Région"
        style={{ width: "100%" }}
        onChange={(val) => console.log(val)}
        id="input-region"
        getPopupContainer={(element) => element.parentNode}
      >
        {regions?.map((region, index) => {
          return (
            <Option key={index} value={region.regionCode}>
              {region.regionName}
            </Option>
          );
        })}
      </SelectElement>
      <SelectElement
        mode="multiple"
        placeholder="Département"
        style={{ width: "100%" }}
        onChange={(val) => {
          setDepartmentValues(val);

          router.push({
            pathname: "/offres",
            query: { ...router.query, departement: val }
          });
        }}
        value={departmentValues}
        id="input-region"
        getPopupContainer={(element) => element.parentNode}
        showArrow={true}
      >
        {regions.map((region, index) => {
          return (
            <OptGroup label={region.regionName} key={index}>
              {departments.map((department, index2) => {
                if (department.regionCode == region.regionCode) {
                  //If departement is in selected region or if departement in in filterstate departements
                  return (
                    <Option key={index2} value={department.departmentCode}>
                      {department.departmentName}
                    </Option>
                  );
                }
              })}
            </OptGroup>
          );
          //return(<option key={index} value={departments.regionCode}>{department.departmentName}</option>)
        })}
      </SelectElement>
    </SearchFiltersElement>
  );
}

const mapState = (state) => {
  return {
    categories: state.category.categories
  };
};

const mapDis = {};

export default connect(mapState, mapDis)(SearchFilters);
