import { gql } from "@apollo/client";

export const SIGNIN_USER = gql`
    mutation SIGNIN_USER($email:String!,$password:String!){
        signinUser(email:$email,password:$password){
            user{
                id
                username
                email
            }
        }
    }
`

export const SIGNUP_USER = gql`
    mutation SIGNUP_USER($username:String!,$email:String!,$password:String!){
        signupUser(username:$username,email:$email,password:$password){
            user{
                id
                username
                email
            }
        }
    }
`
