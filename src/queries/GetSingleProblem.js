import gql from 'graphql-tag';

export default gql`
  query getSingleArea( $problemId: ID! ){
    problem( id:$problemId ){
      photos{
        img
        line
        date
      }
      likes
      description
      latitude
      longitude
      nombre
      user{
        id
      }
    }

  }
`;