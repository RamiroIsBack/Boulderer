import gql from 'graphql-tag';

export default gql`
mutation deleteArea(
  
  $areaId: ID
){
  
  deleteArea(id:$areaId){
    
    user{
      areas{
        nombre
      }
    }
  }

}
`;