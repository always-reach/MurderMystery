import { gql } from "@apollo/client";

export const PLAYED_GAME=gql`
    mutation PLAYED_GAME($userId:Int!,$gameId:Int!){
        playedGame(userId:$userId,gameId:$gameId){
            gameMast{
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
                    username
                    email
                }
            }
        }
    }
`

export const REMOVE_PLAYED_GAME=gql`
    mutation REMOVE_PLAYED_GAME($userId:Int!,$gameId:Int!){
        removePlayedGame(userId:$userId,gameId:$gameId){
            gameMast{
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
                    username
                    email
                }
            }
        }
    }
`