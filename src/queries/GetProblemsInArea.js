import gql from 'graphql-tag';

export default gql`
query getProblemsInArea ($areaId:ID!){
  area(id: $areaId){
    problems{
      nombre
      id
      user{
        nombre
      }
    }
  }
  
}
`;