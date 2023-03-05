import { gql } from "@apollo/client";

export const TOKEN_AUTH = gql`
mutation TokenAuth($username:String!,$password:String!){
    tokenAuth(username: $username, password: $password) {
      success,
      errors,
      unarchiving,
      token,
      refreshToken,
      unarchiving,
      user {
        id,
        username,
      }
    }
  }
`

export const VERIFY_TOKEN = gql`
mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
        success,
        errors,
        payload
    }
  }
`

export const REFRESH_TOKEN = gql`
mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
        success,
        errors,
        payload,
        refreshExpiresIn,
        token,
        refreshToken
    }
}
`

export const REVOKE_TOKEN = gql`
mutation RevokeToken($refreshToken: String!) {
    revokeToken(refreshToken: $refreshToken) {
        success,
        errors
    }
}
`