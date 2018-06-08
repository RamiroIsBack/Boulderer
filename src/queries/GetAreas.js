import gql from 'graphql-tag';

export default gql`
  query{
    areas{
      nombre
      latitude
      longitude
      id
      description
    }

  }
`;