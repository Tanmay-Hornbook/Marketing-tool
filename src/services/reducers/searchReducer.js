import { SEARCH_ACTION_TYPE_CONSTANTS } from "../actions/constants/searchActionConstants";

const initialState = {
  query: "",
  data: [],
  filteredData: [],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_ACTION_TYPE_CONSTANTS.SET_SEARCH_QUERY:
      return {
        ...state,
        query: action.payload,
      };

    case SEARCH_ACTION_TYPE_CONSTANTS.SET_FILTERED_DATA:
      return {
        ...state,
        filteredData: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
