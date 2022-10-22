import { gql } from "@apollo/client";

export const SIGNIN_USER = gql`
    mutation SIGNIN_USER($email:String!,$password:String!){
        loginUser(email:$email,password:$password){
            user{
                id
                username
                email
            }
        }
    }
`