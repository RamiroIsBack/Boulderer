import { tryAuth, } from "../actions";
import actionTypes from '../actions/actionTypes'
const initialState = {
  currentUser:null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TRY_AUTH:
      return {
        ...state,
        currentUser: action.currentUser
          
      };

    
    default:
      return state;
  }
};

export default reducer;