import { gql } from "@apollo/client";

export const SEND_MAIL = gql`
mutation SEND_EMAIL($email:String!,$name:String!,$message:String!){
    sendMail(email:$email,name:$name,message:$message){
      success
    }
  }
`