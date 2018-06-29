import gql from 'graphql-tag';

export default gql`
  query{
    problems{
      id
      nombre
      user{
        id
        nombre
      }
    }
  }
`;