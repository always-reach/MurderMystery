import { gql } from "@apollo/client"

export const GET_ALL_USERS = gql`
  query GET_ALL_USERS{
    allUsers {
      id
      username
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query GET_USER_BY_EMAIL($email:String!){
    userByEmail(email:$email){
      id
      username
      email
    }
  }
`

export const GET_USER_BY_USERNAME = gql`
  query GET_USER_BY_USERNAME($username:String!){
    userByUsername(username:$username){
      id
      username
      email
    }
  }
`
