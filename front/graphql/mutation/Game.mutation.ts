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

export const UPDATE_GAME= gql`
  mutation UpdateGame($input: UpdateGameMutationInput!) {
    updateGame(input: $input) {
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