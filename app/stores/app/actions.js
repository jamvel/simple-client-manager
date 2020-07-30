import { ADD_USER, SET_USER, DELETE_USER, SET_USER_LIST } from './types';

export const setUser = user => dispatch => dispatch({
  type: SET_USER,
  payload: user,
});

export const setUserList = userList => dispatch => dispatch({
  type: SET_USER_LIST,
  payload: userList,
});

export const addNewUser = user => dispatch => {
  dispatch({
    type: ADD_USER,
    payload: user,
  });
};

export const deleteUser = id => dispatch => {
  dispatch({
    type: DELETE_USER,
    payload: id,
  });
};
