import { useLazyQuery } from "@apollo/client";
import { GET_USER_BY_EMAIL } from "../graphql/queries/User.query";

export async function EmailDuplicateValidation(getUser:({variables:{}})=>{},email: string|undefined) {

    const response = await getUser({ variables: { email: email } })
    console.log({response})
    return true
}