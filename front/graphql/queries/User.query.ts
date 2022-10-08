import { gql } from "@apollo/client"

export const USER_QUERY=gql`
    query($email: email!){
        post(email:$email){
            id
            username
            password
            email
        }
    }
`