import { SEARCH_ACTION_TYPE_CONSTANTS } from "./constants/searchActionConstants";

export const setSearchQuery = (query) => ({
  type: SEARCH_ACTION_TYPE_CONSTANTS.SET_SEARCH_QUERY,
  payload: query,
});

export const setFilteredData = (data) => ({
  type: SEARCH_ACTION_TYPE_CONSTANTS.SET_FILTERED_DATA,
  payload: data,
});
