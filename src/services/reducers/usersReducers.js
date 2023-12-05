import { USER_ACTION_TYPES } from "../actions/constants/userActionConstants";

const initialState = {
  users: [],
  user: {},
  loading: false,
  err: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    // * Requests
    /////////////
    case USER_ACTION_TYPES.GET_ONE_USER_REQUEST:
    case USER_ACTION_TYPES.GET_USERS_REQUEST:
    case USER_ACTION_TYPES.CREATE_USER_REQUEST:
    case USER_ACTION_TYPES.UPDATE_USER_REQUEST:
    case USER_ACTION_TYPES.DELETE_USER_REQUEST:
      return {
        ...state,
        err: null,
        loading: true,
      };

    // * Success
    ////////////

    // * GET USERS
    //////////////

    // * SINGLE
    ///////////
    case USER_ACTION_TYPES.GET_ONE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    // * ALL
    ////////
    case USER_ACTION_TYPES.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    // * CREATE USERS
    /////////////////
    case USER_ACTION_TYPES.CREATE_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users.data, action.payload.data],
        loading: false,
      };

    // * UPDATE USERS
    /////////////////
    case USER_ACTION_TYPES.UPDATE_USER_SUCCESS:
      const updatedUsers = state.users.data.map((user) => {
        const jsonData = JSON.parse(action.payload.config.data);
        if (user.id === jsonData.id) {
          const updatedUser = jsonData;
          return updatedUser;
        } else {
          return user;
        }
      });
      return {
        ...state,
        users: updatedUsers,
        loading: false,
      };

    // * DELETE USERS
    /////////////////
    case USER_ACTION_TYPES.DELETE_USER_SUCCESS:
      const filteredUsers = state.users.data.filter((user) => {
        user.id !== action.payload;
      });
      return {
        ...state,
        users: filteredUsers,
        loading: false,
      };

    // * Failure
    ////////////
    case USER_ACTION_TYPES.GET_ONE_USER_FAILURE:
    case USER_ACTION_TYPES.GET_USERS_FAILURE:
    case USER_ACTION_TYPES.CREATE_USER_FAILURE:
    case USER_ACTION_TYPES.UPDATE_USER_FAILURE:
    case USER_ACTION_TYPES.DELETE_USER_FAILURE:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default usersReducer;
