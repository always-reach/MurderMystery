import { gql } from "@apollo/client";

export const TOKEN_AUTH = gql`
mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      payload
      refreshToken
      refreshExpiresIn
    }
  }
`

export const VERIFY_TOKEN = gql`
mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
      payload
    }
  }
`

export const REFRESH_TOKEN = gql`
mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
        token
        payload
        refreshToken
        refreshExpiresIn
    }
}
`

export const REVOKE_TOKEN = gql`
mutation RevokeToken($refreshToken: String!) {
    revokeToken(refreshToken: $refreshToken) {
        revoked
    }
}
`