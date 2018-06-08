import actionTypes from './actionTypes';

export const tryAuth = (currentUser) =>{
  return{
    type: actionTypes.TRY_AUTH,
    currentUser
  };
};
