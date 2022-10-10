import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation ($email:String!,$password:String!){
        loginUser(email:$email,password:$password){
            user{
                id
                username
                email
            }
        }
    }
`

export type MutationUser = {
    loginUser: {
        user: {
            id: string
            username: string
            email: string
        }
    }

}