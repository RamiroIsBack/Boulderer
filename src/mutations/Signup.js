import gql from 'graphql-tag';

export default gql`
  mutation signup ($nombre: String, $email: String, $password: String){
    signup(nombre: $nombre, email:$email, password: $password){
      nombre
      id
      email
    }
    
  }
`;