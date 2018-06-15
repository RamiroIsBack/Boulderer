import gql from 'graphql-tag'

export default gql`
mutation addImg(
 
  $data: String,
 
){
  addImg(
    data: $data){
    id
  }

}

`;