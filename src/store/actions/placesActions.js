import actionTypes from './actionTypes'

export const addPlace = (placeName,location,image) => {
  return{
    type: actionTypes.ADD_PLACE,
    placeName:placeName,
    location: location,
    image:image
  }
  // return dispatch =>{
  //   const placeData = {
  //     name:placeName,
  //     location:location,
  //   }
  //   fetch(
  //     'https://aprieta-1526684972279.firebaseio.com/places.json',
  //     {
  //       method:'POST',
  //       body:JSON.stringify(placeData)
  //     }).catch(
  //       err=>console.log(err)
  //     ).then(res =>res.json().then( parsedRes=>{
  //       console.log(parsedRes);
  //     })
  //   );
    
  // };
};

export const deletePlace = (key) => {
  return {
    type: actionTypes.DELETE_PLACE,
    placeKey:key,
  };
};
