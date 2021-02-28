import AddressActionTypes from "./address.types";
import agent from "../api/agent";

export const fetchCitiesStart = () => ({
  type: AddressActionTypes.FETCH_CITIES_START,
});
export const fetchCitiesSuccess = (cities) => ({
  type: AddressActionTypes.FETCH_CITIES_SUCCESS,
  payload: cities,
});
export const fetchCitiesStartAsync = () => {
  return (dispatch) => {
    dispatch(fetchCitiesStart());
    agent.Address.loadCities().then((result) => {
      let cities = [];
      result.data.forEach((city) => {
        cities.push({ value: city.id, label: city.dsc });
      });
      dispatch(fetchCitiesSuccess(cities));
    });
  };
};

export const fetchCountiesStart = () => ({
  type: AddressActionTypes.FETCH_COUNTIES_START,
});
export const fetchCountiesSuccess = (counties) => ({
  type: AddressActionTypes.FETCH_COUNTIES_SUCCESS,
  payload: counties,
});
export const fetchCountiesStartAsync = (cityId) => {
  return (dispatch) => {
    dispatch(fetchCountiesStart());
    agent.Address.loadCounties(cityId).then((result) => {
      let counties = [];
      result.data.forEach((county) => {
        counties.push({
          value: county.counties_id,
          label: county.countyname,
          cityid: cityId,
        });
      });
      dispatch(fetchCountiesSuccess(counties));
    });
  };
};

export const fetchAreasStart = () => ({
  type: AddressActionTypes.FETCH_AREAS_START,
});
export const fetchAreasSuccess = (areas) => ({
  type: AddressActionTypes.FETCH_AREAS_SUCCESS,
  payload: areas,
});
export const fetchAreasStartAsync = (countyid) => {
  return (dispatch) => {
    dispatch(fetchAreasStart());
    agent.Address.loadAreas(countyid).then((result) => {
      let areas = [];
      result.data.forEach((area) =>
        areas.push({
          value: area.areas_id,
          label: area.areaname,
          countyId: countyid,
        })
      );
      dispatch(fetchAreasSuccess(areas));
    });
  };
};

export const fetchNeighborhoodsStart = () => ({
  type: AddressActionTypes.FETCH_NEIGHBORHOODS_START,
});
export const fetchNeighborhoodsSuccess = (neighborhoods) => ({
  type: AddressActionTypes.FETCH_NEIGHBORHOODS_SUCCESS,
  payload: neighborhoods,
});
export const fetchNeighborhoodsStartAsync = (areaid) => {
  return (dispatch) => {
    dispatch(fetchNeighborhoodsStart());
    agent.Address.loadNeighborhoods(areaid).then((result) => {
      let neighborhoods = [];
      result.data.forEach((neighborhood) =>
        neighborhoods.push({
          value: neighborhood.id,
          label: neighborhood.dsc,
          areaid: areaid,
        })
      );
      dispatch(fetchNeighborhoodsSuccess(neighborhoods));
    });
  };
};

export const resetAddressFetch = () => ({
  type: AddressActionTypes.RESET_ADDRESS_FETCH,
});
