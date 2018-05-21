import { addPlace, deletePlace } from "../actions";
import actionTypes from '../actions/actionTypes'
const initialState = {
  places: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PLACE:
      return {
        ...state,
        places: state.places
          .concat(
            {
              key: Math.random().toString(),
              name: action.placeName,
              image: { uri: 'https://firebasestorage.googleapis.com/v0/b/micotextil-3f024.appspot.com/o/facebookTrans.png?alt=media&token=f0f02332-86fc-4ccf-b89a-ad54a29a8c79' }
            }
          ),
      };

    case actionTypes.DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.placeKey;
        })
      }
    
    default:
      return state;
  }
};

export default reducer;