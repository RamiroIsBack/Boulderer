import gql from 'graphql-tag';

export default gql`
  mutation addProblemToArea(
    $nombre: String,
    $photos: [String],
    $content: String,
    $areaId: ID,
    $userId: ID
  ){
    addProblemToArea(
      nombre: $nombre,
      photos:$photos,
      content: $content,
      areaId:$areaId,
      userId:$userId
      ){
      user{
        email
      }
      id
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
