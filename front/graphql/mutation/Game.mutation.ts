import { gql } from "@apollo/client";


export const CREATE_GAME = gql`
mutation CREATE_GAME(
        $title:String!,
        $auther:String,
        $playTimeMinute:Int,
        $maxPlayerCount:Int,
        $minPlayerCount:Int,
        $note:String,
        $image:Upload,
        $playedAt:String,
        $user:Int!
        ){
    createGame(
            title:$title,
            auther:$auther,
            playTimeMinute:$playTimeMinute,
            maxPlayerCount:$maxPlayerCount,
            minPlayerCount:$minPlayerCount,
            note:$note,
            image:$image,
            playedAt:$playedAt,
            user:$user){
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