import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  signinUser?: Maybe<SignInUserMutation>;
  signupUser?: Maybe<SignUpUserMutation>;
};


export type MutationSigninUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** ユーザー取得API */
  allUsers?: Maybe<Array<UserType>>;
  /** メールアドレス検索API */
  userByEmail: UserType;
  /** ユーザー名検索API */
  userByUsername: UserType;
};


export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};


export type QueryUserByUsernameArgs = {
  username: Scalars['String'];
};

export type SignInUserMutation = {
  __typename?: 'SignInUserMutation';
  user?: Maybe<UserType>;
};

export type SignUpUserMutation = {
  __typename?: 'SignUpUserMutation';
  user?: Maybe<UserType>;
};

export type UserType = {
  __typename?: 'UserType';
  email: Scalars['String'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isStaff: Scalars['Boolean'];
  /** Designates that this user has all permissions without explicitly assigning them. */
  isSuperuser: Scalars['Boolean'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Signin_UserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type Signin_UserMutation = { __typename?: 'Mutation', signinUser?: { __typename?: 'SignInUserMutation', user?: { __typename?: 'UserType', id: string, username: string, email: string } | null } | null };

export type Signup_UserMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type Signup_UserMutation = { __typename?: 'Mutation', signupUser?: { __typename?: 'SignUpUserMutation', user?: { __typename?: 'UserType', id: string, username: string, email: string } | null } | null };

export type Get_All_UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type Get_All_UsersQuery = { __typename?: 'Query', allUsers?: Array<{ __typename?: 'UserType', id: string, username: string }> | null };

export type Get_User_By_EmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type Get_User_By_EmailQuery = { __typename?: 'Query', userByEmail: { __typename?: 'UserType', id: string, username: string, email: string } };

export type Get_User_By_UsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type Get_User_By_UsernameQuery = { __typename?: 'Query', userByUsername: { __typename?: 'UserType', id: string, username: string, email: string } };


export const Signin_UserDocument = gql`
    mutation SIGNIN_USER($email: String!, $password: String!) {
  signinUser(email: $email, password: $password) {
    user {
      id
      username
      email
    }
  }
}
    `;
export type Signin_UserMutationFn = Apollo.MutationFunction<Signin_UserMutation, Signin_UserMutationVariables>;

/**
 * __useSignin_UserMutation__
 *
 * To run a mutation, you first call `useSignin_UserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignin_UserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinUserMutation, { data, loading, error }] = useSignin_UserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignin_UserMutation(baseOptions?: Apollo.MutationHookOptions<Signin_UserMutation, Signin_UserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Signin_UserMutation, Signin_UserMutationVariables>(Signin_UserDocument, options);
      }
export type Signin_UserMutationHookResult = ReturnType<typeof useSignin_UserMutation>;
export type Signin_UserMutationResult = Apollo.MutationResult<Signin_UserMutation>;
export type Signin_UserMutationOptions = Apollo.BaseMutationOptions<Signin_UserMutation, Signin_UserMutationVariables>;
export const Signup_UserDocument = gql`
    mutation SIGNUP_USER($username: String!, $email: String!, $password: String!) {
  signupUser(username: $username, email: $email, password: $password) {
    user {
      id
      username
      email
    }
  }
}
    `;
export type Signup_UserMutationFn = Apollo.MutationFunction<Signup_UserMutation, Signup_UserMutationVariables>;

/**
 * __useSignup_UserMutation__
 *
 * To run a mutation, you first call `useSignup_UserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignup_UserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupUserMutation, { data, loading, error }] = useSignup_UserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignup_UserMutation(baseOptions?: Apollo.MutationHookOptions<Signup_UserMutation, Signup_UserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Signup_UserMutation, Signup_UserMutationVariables>(Signup_UserDocument, options);
      }
export type Signup_UserMutationHookResult = ReturnType<typeof useSignup_UserMutation>;
export type Signup_UserMutationResult = Apollo.MutationResult<Signup_UserMutation>;
export type Signup_UserMutationOptions = Apollo.BaseMutationOptions<Signup_UserMutation, Signup_UserMutationVariables>;
export const Get_All_UsersDocument = gql`
    query GET_ALL_USERS {
  allUsers {
    id
    username
  }
}
    `;

/**
 * __useGet_All_UsersQuery__
 *
 * To run a query within a React component, call `useGet_All_UsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_All_UsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_All_UsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGet_All_UsersQuery(baseOptions?: Apollo.QueryHookOptions<Get_All_UsersQuery, Get_All_UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Get_All_UsersQuery, Get_All_UsersQueryVariables>(Get_All_UsersDocument, options);
      }
export function useGet_All_UsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get_All_UsersQuery, Get_All_UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Get_All_UsersQuery, Get_All_UsersQueryVariables>(Get_All_UsersDocument, options);
        }
export type Get_All_UsersQueryHookResult = ReturnType<typeof useGet_All_UsersQuery>;
export type Get_All_UsersLazyQueryHookResult = ReturnType<typeof useGet_All_UsersLazyQuery>;
export type Get_All_UsersQueryResult = Apollo.QueryResult<Get_All_UsersQuery, Get_All_UsersQueryVariables>;
export const Get_User_By_EmailDocument = gql`
    query GET_USER_BY_EMAIL($email: String!) {
  userByEmail(email: $email) {
    id
    username
    email
  }
}
    `;

/**
 * __useGet_User_By_EmailQuery__
 *
 * To run a query within a React component, call `useGet_User_By_EmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_User_By_EmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_User_By_EmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGet_User_By_EmailQuery(baseOptions: Apollo.QueryHookOptions<Get_User_By_EmailQuery, Get_User_By_EmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Get_User_By_EmailQuery, Get_User_By_EmailQueryVariables>(Get_User_By_EmailDocument, options);
      }
export function useGet_User_By_EmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get_User_By_EmailQuery, Get_User_By_EmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Get_User_By_EmailQuery, Get_User_By_EmailQueryVariables>(Get_User_By_EmailDocument, options);
        }
export type Get_User_By_EmailQueryHookResult = ReturnType<typeof useGet_User_By_EmailQuery>;
export type Get_User_By_EmailLazyQueryHookResult = ReturnType<typeof useGet_User_By_EmailLazyQuery>;
export type Get_User_By_EmailQueryResult = Apollo.QueryResult<Get_User_By_EmailQuery, Get_User_By_EmailQueryVariables>;
export const Get_User_By_UsernameDocument = gql`
    query GET_USER_BY_USERNAME($username: String!) {
  userByUsername(username: $username) {
    id
    username
    email
  }
}
    `;

/**
 * __useGet_User_By_UsernameQuery__
 *
 * To run a query within a React component, call `useGet_User_By_UsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_User_By_UsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_User_By_UsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGet_User_By_UsernameQuery(baseOptions: Apollo.QueryHookOptions<Get_User_By_UsernameQuery, Get_User_By_UsernameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Get_User_By_UsernameQuery, Get_User_By_UsernameQueryVariables>(Get_User_By_UsernameDocument, options);
      }
export function useGet_User_By_UsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get_User_By_UsernameQuery, Get_User_By_UsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Get_User_By_UsernameQuery, Get_User_By_UsernameQueryVariables>(Get_User_By_UsernameDocument, options);
        }
export type Get_User_By_UsernameQueryHookResult = ReturnType<typeof useGet_User_By_UsernameQuery>;
export type Get_User_By_UsernameLazyQueryHookResult = ReturnType<typeof useGet_User_By_UsernameLazyQuery>;
export type Get_User_By_UsernameQueryResult = Apollo.QueryResult<Get_User_By_UsernameQuery, Get_User_By_UsernameQueryVariables>;