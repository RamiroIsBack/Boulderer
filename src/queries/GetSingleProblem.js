import gql from 'graphql-tag';

export default gql`
  query getSingleArea( $problemId: ID! ){
    problem( id:$problemId ){
      photos{
        img
        line
        date
        id
      }
      likes
      description
      latitude
      longitude
      nombre
      id
      user{
        id
      }
    }

  }
`;