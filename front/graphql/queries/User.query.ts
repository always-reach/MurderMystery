import { gql } from "@apollo/client"

export const GET_ALL_USERS = gql`
  query {
    allUsers {
      id
      username
    }
  }
`;

export const GET_USER_BY_EMAIL=gql`
  query ($email:String!){
    userByEmail(email:$email){
        id
        username
    }
  }
`

export type Users={
    data:[]
}