import { HYDRATE } from 'next-redux-wrapper';
import { ADD_USER, SET_USER, DELETE_USER, SET_USER_LIST } from './types';

const initialState = {
  user: null,
  userList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case ADD_USER: {
      return {
        ...state,
        userList: [...state.userList, action.payload],
      };
    }
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        userList: [...state.userList.filter(user => user.id !== action.payload)],
      };
    case SET_USER_LIST:
      return {
        ...state,
        userList: action.payload,
      };
    default:
      return state;
  }
};
