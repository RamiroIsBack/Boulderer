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
              location: action.location,
              image: {uri: action.image.uri}
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