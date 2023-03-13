import { gql } from "@apollo/client"

export const GET_ALL_GAME_MAST = gql`
    query GET_ALL_GAME_MAST{
        allGameMasts{
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
`

export const GET_GAME_MAST_BY_USER_ID = gql`
    query GET_GAME_MAST_BY_USER_ID($userId:Int!){
        gameByUserId(userId:$userId){
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
`