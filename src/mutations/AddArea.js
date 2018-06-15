import gql from 'graphql-tag';

export default gql`
  mutation addArea(
    $nombre: String,
    $comments:[String],
    $img: String,
    $description: String,
    $latitude:Float,
    $longitude: Float,
    $userId: ID
  ){
    addArea(
      comments: $comments,
      nombre: $nombre,
      latitude:$latitude,
      longitude:$longitude,
      img:$img,
      description: $description,
      userId:$userId   
      ){
      user{
        email
      }
      nombre
      id
    }
  }
`;
//variables
// {
//   "longitude": -118.1175096,
//   "nombre": "Alabama hills",
//   "description": "yeah manuela",
//   "latitude": 36.6099982,
//   "photos": [
//     "oleee",
//     "half dome",
//     "el cap"
//   ],
//   "comments": [
//     "esta bien",
//     "sobrevalorado"
//   ],
//   "userId": "5b17e724482a5b04bab9198d"
// }