import { gql } from "@apollo/client"

export const GET_ALL_GAME_MAST = gql`
    query GET_ALL_GAME_MAST{
        allGameMasts{
            id
            title
            auther
            gmLess
            playTimeMinute
            maxPlayerCount
            minPlayerCount
            note
            image
            playedUsers{
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
            gmLess
            playTimeMinute
            maxPlayerCount
            minPlayerCount
            note
            image
            playedUsers{
                id
            }
        }
    }
`