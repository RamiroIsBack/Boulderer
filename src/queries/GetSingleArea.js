import gql from 'graphql-tag'

export default gql`
  query getSingleArea( $areaId: ID! ){
    area( id:$areaId ){
      id
      description
      latitude
      longitude
      nombre
      photos{
        id
        img
      }
      comments
      problems{
        nombre
        
        likes
        description
        latitude
        longitude
        id
      }
      user{
        id
        nombre
      }
    }

  }
`;