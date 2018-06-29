import gql from 'graphql-tag';

export default gql`
  mutation addProblemToArea(
    $nombre: String,
    $line: String,
    $img: String,
    $description: String,
    $areaId: ID,
    $userId: ID,
    $latitude:Float,
    $longitude:Float
  ){
    addProblemToArea(
      nombre: $nombre,
      img:$img,
      line:$line,
      description: $description,
      areaId:$areaId,
      userId:$userId,
      latitude:$latitude,
      longitude:$longitude
      ){
      user{
        email
      }
      id
      nombre
    }

  }
`;
//variables
// {
//   "nombre": "prueba",
//   "content": "q t cagas",
//   "photos": "ddddddddddddddd",
//   "areaId":"5b152c08e6123c0251d9270b",
// 	"userId":"5b0812428e378f1474d02d02",
// }
