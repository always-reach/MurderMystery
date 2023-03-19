import { gql } from "@apollo/client";

export const CREATE_GAME= gql`
  mutation CreateGame($input: CreateGameMutationInput!) {
    createGame(input: $input) {
      game {
        id
        title
        auther
        playTimeMinute
        maxPlayerCount
        minPlayerCount
        note
        image
        playedAt
        user {
          id
          username
        }
      }
    }
  }
`;

export const PLAYED_GAME = gql`
    mutation PLAYED_GAME($userId:Int!,$gameId:Int!){
        playedGame(userId:$userId,gameId:$gameId){
            game{
                id
                title
                auther
                playTimeMinute
                maxPlayerCount
                minPlayerCount
                note
                image
                playedAt
                user{
                    id
                }
            }
        }
    }
`

export const REMOVE_PLAYED_GAME = gql`
    mutation REMOVE_PLAYED_GAME($userId:Int!,$gameId:Int!){
        removePlayedGame(userId:$userId,gameId:$gameId){
            game{
                id
                title
                auther
                playTimeMinute
                maxPlayerCount
                minPlayerCount
                note
                image
                playedAt
                user{
                    id
                }
            }
        }
    }
`