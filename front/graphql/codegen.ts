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
  Date: any;
  DateTime: any;
  ExpectedErrorType: any;
  GenericScalar: any;
};

/**
 * Archive account and revoke refresh tokens.
 *
 * User must be verified and confirm password.
 */
export type ArchiveAccount = {
  __typename?: 'ArchiveAccount';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type CreateGameMutationInput = {
  auther?: InputMaybe<Scalars['String']>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  image?: InputMaybe<Scalars['String']>;
  maxPlayerCount?: InputMaybe<Scalars['Int']>;
  minPlayerCount?: InputMaybe<Scalars['Int']>;
  note?: InputMaybe<Scalars['String']>;
  playTimeMinute?: InputMaybe<Scalars['Int']>;
  playedAt: Scalars['Date'];
  title: Scalars['String'];
  user?: InputMaybe<Scalars['String']>;
};

export type CreateGameMutationPayload = {
  __typename?: 'CreateGameMutationPayload';
  auther?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** May contain more than one error for same field. */
  errors?: Maybe<Array<Maybe<ErrorType>>>;
  game?: Maybe<GameType>;
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  maxPlayerCount?: Maybe<Scalars['Int']>;
  minPlayerCount?: Maybe<Scalars['Int']>;
  note?: Maybe<Scalars['String']>;
  playTimeMinute?: Maybe<Scalars['Int']>;
  playedAt?: Maybe<Scalars['Date']>;
  title?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
};

/**
 * Delete account permanently or make `user.is_active=False`.
 *
 * The behavior is defined on settings.
 * Anyway user refresh tokens are revoked.
 *
 * User must be verified and confirm password.
 */
export type DeleteAccount = {
  __typename?: 'DeleteAccount';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type ErrorType = {
  __typename?: 'ErrorType';
  field: Scalars['String'];
  messages: Array<Scalars['String']>;
};

export type GameType = {
  __typename?: 'GameType';
  auther?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  maxPlayerCount?: Maybe<Scalars['Int']>;
  minPlayerCount?: Maybe<Scalars['Int']>;
  note?: Maybe<Scalars['String']>;
  playTimeMinute?: Maybe<Scalars['Int']>;
  playedAt: Scalars['Date'];
  title: Scalars['String'];
  user: UserNode;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Archive account and revoke refresh tokens.
   *
   * User must be verified and confirm password.
   */
  archiveAccount?: Maybe<ArchiveAccount>;
  createGame?: Maybe<CreateGameMutationPayload>;
  /**
   * Delete account permanently or make `user.is_active=False`.
   *
   * The behavior is defined on settings.
   * Anyway user refresh tokens are revoked.
   *
   * User must be verified and confirm password.
   */
  deleteAccount?: Maybe<DeleteAccount>;
  /**
   * Change account password when user knows the old password.
   *
   * A new token and refresh token are sent. User must be verified.
   */
  passwordChange?: Maybe<PasswordChange>;
  /**
   * Change user password without old password.
   *
   * Receive the token that was sent by email.
   *
   * If token and new passwords are valid, update
   * user password and in case of using refresh
   * tokens, revoke all of them.
   */
  passwordReset?: Maybe<PasswordReset>;
  /** Same as `grapgql_jwt` implementation, with standard output. */
  refreshToken?: Maybe<RefreshToken>;
  /**
   * Register user with fields defined in the settings.
   *
   * If the email field of the user model is part of the
   * registration fields (default), check if there is
   * no user with that email or as a secondary email.
   *
   * If it exists, it does not register the user,
   * even if the email field is not defined as unique
   * (default of the default django user model).
   *
   * When creating the user, it also creates a `UserStatus`
   * related to that user, making it possible to track
   * if the user is archived, verified and has a secondary
   * email.
   *
   * Send account verification email.
   *
   * If allowed to not verified users login, return token.
   */
  register?: Maybe<Register>;
  /**
   * Remove user secondary email.
   *
   * Require password confirmation.
   */
  removeSecondaryEmail?: Maybe<RemoveSecondaryEmail>;
  /**
   * Sends activation email.
   *
   * It is called resend because theoretically
   * the first activation email was sent when
   * the user registered.
   *
   * If there is no user with the requested email,
   * a successful response is returned.
   */
  resendActivationEmail?: Maybe<ResendActivationEmail>;
  /** Same as `grapgql_jwt` implementation, with standard output. */
  revokeToken?: Maybe<RevokeToken>;
  sendMail?: Maybe<SendEmailMutation>;
  /**
   * Send password reset email.
   *
   * For non verified users, send an activation
   * email instead.
   *
   * Accepts both primary and secondary email.
   *
   * If there is no user with the requested email,
   * a successful response is returned.
   */
  sendPasswordResetEmail?: Maybe<SendPasswordResetEmail>;
  /**
   * Send activation to secondary email.
   *
   * User must be verified and confirm password.
   */
  sendSecondaryEmailActivation?: Maybe<SendSecondaryEmailActivation>;
  signinUser?: Maybe<SignInUserMutation>;
  signupUser?: Maybe<SignUpUserMutation>;
  /**
   * Swap between primary and secondary emails.
   *
   * Require password confirmation.
   */
  swapEmails?: Maybe<SwapEmails>;
  /**
   * Obtain JSON web token for given user.
   *
   * Allow to perform login with different fields,
   * and secondary email if set. The fields are
   * defined on settings.
   *
   * Not verified users can login by default. This
   * can be changes on settings.
   *
   * If user is archived, make it unarchive and
   * return `unarchiving=True` on output.
   */
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  /**
   * Update user model fields, defined on settings.
   *
   * User must be verified.
   */
  updateAccount?: Maybe<UpdateAccount>;
  updateGame?: Maybe<UpdateGameMutationPayload>;
  /**
   * Verify user account.
   *
   * Receive the token that was sent by email.
   * If the token is valid, make the user verified
   * by making the `user.status.verified` field true.
   */
  verifyAccount?: Maybe<VerifyAccount>;
  /**
   * Verify user secondary email.
   *
   * Receive the token that was sent by email.
   * User is already verified when using this mutation.
   *
   * If the token is valid, add the secondary email
   * to `user.status.secondary_email` field.
   *
   * Note that until the secondary email is verified,
   * it has not been saved anywhere beyond the token,
   * so it can still be used to create a new account.
   * After being verified, it will no longer be available.
   */
  verifySecondaryEmail?: Maybe<VerifySecondaryEmail>;
  /** Same as `grapgql_jwt` implementation, with standard output. */
  verifyToken?: Maybe<VerifyToken>;
};


export type MutationArchiveAccountArgs = {
  password: Scalars['String'];
};


export type MutationCreateGameArgs = {
  input: CreateGameMutationInput;
};


export type MutationDeleteAccountArgs = {
  password: Scalars['String'];
};


export type MutationPasswordChangeArgs = {
  newPassword1: Scalars['String'];
  newPassword2: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationPasswordResetArgs = {
  newPassword1: Scalars['String'];
  newPassword2: Scalars['String'];
  token: Scalars['String'];
};


export type MutationRefreshTokenArgs = {
  refreshToken?: InputMaybe<Scalars['String']>;
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  password1: Scalars['String'];
  password2: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRemoveSecondaryEmailArgs = {
  password: Scalars['String'];
};


export type MutationResendActivationEmailArgs = {
  email: Scalars['String'];
};


export type MutationRevokeTokenArgs = {
  refreshToken?: InputMaybe<Scalars['String']>;
};


export type MutationSendMailArgs = {
  email: Scalars['String'];
  message: Scalars['String'];
  name: Scalars['String'];
};


export type MutationSendPasswordResetEmailArgs = {
  email: Scalars['String'];
};


export type MutationSendSecondaryEmailActivationArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
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


export type MutationSwapEmailsArgs = {
  password: Scalars['String'];
};


export type MutationTokenAuthArgs = {
  email?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateAccountArgs = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateGameArgs = {
  input: UpdateGameMutationInput;
};


export type MutationVerifyAccountArgs = {
  token: Scalars['String'];
};


export type MutationVerifySecondaryEmailArgs = {
  token: Scalars['String'];
};


export type MutationVerifyTokenArgs = {
  token?: InputMaybe<Scalars['String']>;
};

/** An object with an ID */
export type Node = {
  /** The ID of the object */
  id: Scalars['ID'];
};

/**
 * Obtain JSON web token for given user.
 *
 * Allow to perform login with different fields,
 * and secondary email if set. The fields are
 * defined on settings.
 *
 * Not verified users can login by default. This
 * can be changes on settings.
 *
 * If user is archived, make it unarchive and
 * return `unarchiving=True` on output.
 */
export type ObtainJsonWebToken = {
  __typename?: 'ObtainJSONWebToken';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  payload: Scalars['GenericScalar'];
  refreshExpiresIn: Scalars['Int'];
  refreshToken: Scalars['String'];
  success?: Maybe<Scalars['Boolean']>;
  token: Scalars['String'];
  unarchiving?: Maybe<Scalars['Boolean']>;
  user?: Maybe<UserNode>;
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

/**
 * Change account password when user knows the old password.
 *
 * A new token and refresh token are sent. User must be verified.
 */
export type PasswordChange = {
  __typename?: 'PasswordChange';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  refreshToken?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
};

/**
 * Change user password without old password.
 *
 * Receive the token that was sent by email.
 *
 * If token and new passwords are valid, update
 * user password and in case of using refresh
 * tokens, revoke all of them.
 */
export type PasswordReset = {
  __typename?: 'PasswordReset';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  /** ユーザー取得API */
  allUsers?: Maybe<Array<UserType>>;
  gameById?: Maybe<GameType>;
  gameByUser?: Maybe<Array<Maybe<GameType>>>;
  me?: Maybe<UserNode>;
  user?: Maybe<UserNode>;
  /** メールアドレス検索API */
  userByEmail: UserType;
  /** ユーザー名検索API */
  userByUsername: UserType;
  users?: Maybe<UserNodeConnection>;
};


export type QueryGameByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGameByUserArgs = {
  user: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};


export type QueryUserByUsernameArgs = {
  username: Scalars['String'];
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  status_Archived?: InputMaybe<Scalars['Boolean']>;
  status_SecondaryEmail?: InputMaybe<Scalars['String']>;
  status_Verified?: InputMaybe<Scalars['Boolean']>;
  username?: InputMaybe<Scalars['String']>;
  username_Icontains?: InputMaybe<Scalars['String']>;
  username_Istartswith?: InputMaybe<Scalars['String']>;
};

/** Same as `grapgql_jwt` implementation, with standard output. */
export type RefreshToken = {
  __typename?: 'RefreshToken';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  payload: Scalars['GenericScalar'];
  refreshExpiresIn: Scalars['Int'];
  refreshToken: Scalars['String'];
  success?: Maybe<Scalars['Boolean']>;
  token: Scalars['String'];
};

/**
 * Register user with fields defined in the settings.
 *
 * If the email field of the user model is part of the
 * registration fields (default), check if there is
 * no user with that email or as a secondary email.
 *
 * If it exists, it does not register the user,
 * even if the email field is not defined as unique
 * (default of the default django user model).
 *
 * When creating the user, it also creates a `UserStatus`
 * related to that user, making it possible to track
 * if the user is archived, verified and has a secondary
 * email.
 *
 * Send account verification email.
 *
 * If allowed to not verified users login, return token.
 */
export type Register = {
  __typename?: 'Register';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  refreshToken?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
};

/**
 * Remove user secondary email.
 *
 * Require password confirmation.
 */
export type RemoveSecondaryEmail = {
  __typename?: 'RemoveSecondaryEmail';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

/**
 * Sends activation email.
 *
 * It is called resend because theoretically
 * the first activation email was sent when
 * the user registered.
 *
 * If there is no user with the requested email,
 * a successful response is returned.
 */
export type ResendActivationEmail = {
  __typename?: 'ResendActivationEmail';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

/** Same as `grapgql_jwt` implementation, with standard output. */
export type RevokeToken = {
  __typename?: 'RevokeToken';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  revoked: Scalars['Int'];
  success?: Maybe<Scalars['Boolean']>;
};

export type SendEmailMutation = {
  __typename?: 'SendEmailMutation';
  success?: Maybe<Scalars['Boolean']>;
};

/**
 * Send password reset email.
 *
 * For non verified users, send an activation
 * email instead.
 *
 * Accepts both primary and secondary email.
 *
 * If there is no user with the requested email,
 * a successful response is returned.
 */
export type SendPasswordResetEmail = {
  __typename?: 'SendPasswordResetEmail';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

/**
 * Send activation to secondary email.
 *
 * User must be verified and confirm password.
 */
export type SendSecondaryEmailActivation = {
  __typename?: 'SendSecondaryEmailActivation';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type SignInUserMutation = {
  __typename?: 'SignInUserMutation';
  user?: Maybe<UserType>;
};

export type SignUpUserMutation = {
  __typename?: 'SignUpUserMutation';
  user?: Maybe<UserType>;
};

/**
 * Swap between primary and secondary emails.
 *
 * Require password confirmation.
 */
export type SwapEmails = {
  __typename?: 'SwapEmails';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

/**
 * Update user model fields, defined on settings.
 *
 * User must be verified.
 */
export type UpdateAccount = {
  __typename?: 'UpdateAccount';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UpdateGameMutationInput = {
  auther?: InputMaybe<Scalars['String']>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  image?: InputMaybe<Scalars['String']>;
  maxPlayerCount?: InputMaybe<Scalars['Int']>;
  minPlayerCount?: InputMaybe<Scalars['Int']>;
  note?: InputMaybe<Scalars['String']>;
  playTimeMinute?: InputMaybe<Scalars['Int']>;
  playedAt: Scalars['Date'];
  title: Scalars['String'];
  user?: InputMaybe<Scalars['String']>;
};

export type UpdateGameMutationPayload = {
  __typename?: 'UpdateGameMutationPayload';
  auther?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
  /** May contain more than one error for same field. */
  errors?: Maybe<Array<Maybe<ErrorType>>>;
  game?: Maybe<GameType>;
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  maxPlayerCount?: Maybe<Scalars['Int']>;
  minPlayerCount?: Maybe<Scalars['Int']>;
  note?: Maybe<Scalars['String']>;
  playTimeMinute?: Maybe<Scalars['Int']>;
  playedAt?: Maybe<Scalars['Date']>;
  title?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
};

export type UserNode = Node & {
  __typename?: 'UserNode';
  archived?: Maybe<Scalars['Boolean']>;
  email: Scalars['String'];
  /** The ID of the object */
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isStaff: Scalars['Boolean'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  pk?: Maybe<Scalars['Int']>;
  playedTitle: Array<GameType>;
  secondaryEmail?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  verified?: Maybe<Scalars['Boolean']>;
};

export type UserNodeConnection = {
  __typename?: 'UserNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<UserNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `UserNode` and its cursor. */
export type UserNodeEdge = {
  __typename?: 'UserNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<UserNode>;
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
  playedTitle: Array<GameType>;
  username: Scalars['String'];
};

/**
 * Verify user account.
 *
 * Receive the token that was sent by email.
 * If the token is valid, make the user verified
 * by making the `user.status.verified` field true.
 */
export type VerifyAccount = {
  __typename?: 'VerifyAccount';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

/**
 * Verify user secondary email.
 *
 * Receive the token that was sent by email.
 * User is already verified when using this mutation.
 *
 * If the token is valid, add the secondary email
 * to `user.status.secondary_email` field.
 *
 * Note that until the secondary email is verified,
 * it has not been saved anywhere beyond the token,
 * so it can still be used to create a new account.
 * After being verified, it will no longer be available.
 */
export type VerifySecondaryEmail = {
  __typename?: 'VerifySecondaryEmail';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

/** Same as `grapgql_jwt` implementation, with standard output. */
export type VerifyToken = {
  __typename?: 'VerifyToken';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  payload: Scalars['GenericScalar'];
  success?: Maybe<Scalars['Boolean']>;
};

export type CreateGameMutationVariables = Exact<{
  input: CreateGameMutationInput;
}>;


export type CreateGameMutation = { __typename?: 'Mutation', createGame?: { __typename?: 'CreateGameMutationPayload', game?: { __typename?: 'GameType', id: string, title: string, auther?: string | null, playTimeMinute?: number | null, maxPlayerCount?: number | null, minPlayerCount?: number | null, note?: string | null, image?: string | null, playedAt: any, user: { __typename?: 'UserNode', id: string, username: string } } | null } | null };

export type UpdateGameMutationVariables = Exact<{
  input: UpdateGameMutationInput;
}>;


export type UpdateGameMutation = { __typename?: 'Mutation', updateGame?: { __typename?: 'UpdateGameMutationPayload', game?: { __typename?: 'GameType', id: string, title: string, auther?: string | null, playTimeMinute?: number | null, maxPlayerCount?: number | null, minPlayerCount?: number | null, note?: string | null, image?: string | null, playedAt: any, user: { __typename?: 'UserNode', id: string, username: string } } | null } | null };

export type TokenAuthMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type TokenAuthMutation = { __typename?: 'Mutation', tokenAuth?: { __typename?: 'ObtainJSONWebToken', success?: boolean | null, errors?: any | null, unarchiving?: boolean | null, token: string, refreshToken: string, user?: { __typename?: 'UserNode', id: string, username: string } | null } | null };

export type VerifyTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyTokenMutation = { __typename?: 'Mutation', verifyToken?: { __typename?: 'VerifyToken', success?: boolean | null, errors?: any | null, payload: any } | null };

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken?: { __typename?: 'RefreshToken', success?: boolean | null, errors?: any | null, payload: any, refreshExpiresIn: number, token: string, refreshToken: string } | null };

export type RevokeTokenMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RevokeTokenMutation = { __typename?: 'Mutation', revokeToken?: { __typename?: 'RevokeToken', success?: boolean | null, errors?: any | null } | null };

export type Send_EmailMutationVariables = Exact<{
  email: Scalars['String'];
  name: Scalars['String'];
  message: Scalars['String'];
}>;


export type Send_EmailMutation = { __typename?: 'Mutation', sendMail?: { __typename?: 'SendEmailMutation', success?: boolean | null } | null };

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

export type Get_Game_Mast_By_UserQueryVariables = Exact<{
  User: Scalars['Int'];
}>;


export type Get_Game_Mast_By_UserQuery = { __typename?: 'Query', gameByUser?: Array<{ __typename?: 'GameType', id: string, title: string, auther?: string | null, playTimeMinute?: number | null, maxPlayerCount?: number | null, minPlayerCount?: number | null, note?: string | null, image?: string | null, playedAt: any, user: { __typename?: 'UserNode', id: string } } | null> | null };

export type Get_Game_Mast_By_IdQueryVariables = Exact<{
  Id: Scalars['Int'];
}>;


export type Get_Game_Mast_By_IdQuery = { __typename?: 'Query', gameById?: { __typename?: 'GameType', id: string, title: string, auther?: string | null, playTimeMinute?: number | null, maxPlayerCount?: number | null, minPlayerCount?: number | null, note?: string | null, image?: string | null, playedAt: any, user: { __typename?: 'UserNode', id: string } } | null };

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


export const CreateGameDocument = gql`
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
export type CreateGameMutationFn = Apollo.MutationFunction<CreateGameMutation, CreateGameMutationVariables>;

/**
 * __useCreateGameMutation__
 *
 * To run a mutation, you first call `useCreateGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGameMutation, { data, loading, error }] = useCreateGameMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateGameMutation(baseOptions?: Apollo.MutationHookOptions<CreateGameMutation, CreateGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGameMutation, CreateGameMutationVariables>(CreateGameDocument, options);
      }
export type CreateGameMutationHookResult = ReturnType<typeof useCreateGameMutation>;
export type CreateGameMutationResult = Apollo.MutationResult<CreateGameMutation>;
export type CreateGameMutationOptions = Apollo.BaseMutationOptions<CreateGameMutation, CreateGameMutationVariables>;
export const UpdateGameDocument = gql`
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
export type UpdateGameMutationFn = Apollo.MutationFunction<UpdateGameMutation, UpdateGameMutationVariables>;

/**
 * __useUpdateGameMutation__
 *
 * To run a mutation, you first call `useUpdateGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGameMutation, { data, loading, error }] = useUpdateGameMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateGameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGameMutation, UpdateGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGameMutation, UpdateGameMutationVariables>(UpdateGameDocument, options);
      }
export type UpdateGameMutationHookResult = ReturnType<typeof useUpdateGameMutation>;
export type UpdateGameMutationResult = Apollo.MutationResult<UpdateGameMutation>;
export type UpdateGameMutationOptions = Apollo.BaseMutationOptions<UpdateGameMutation, UpdateGameMutationVariables>;
export const TokenAuthDocument = gql`
    mutation TokenAuth($username: String!, $password: String!) {
  tokenAuth(username: $username, password: $password) {
    success
    errors
    unarchiving
    token
    refreshToken
    unarchiving
    user {
      id
      username
    }
  }
}
    `;
export type TokenAuthMutationFn = Apollo.MutationFunction<TokenAuthMutation, TokenAuthMutationVariables>;

/**
 * __useTokenAuthMutation__
 *
 * To run a mutation, you first call `useTokenAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTokenAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tokenAuthMutation, { data, loading, error }] = useTokenAuthMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useTokenAuthMutation(baseOptions?: Apollo.MutationHookOptions<TokenAuthMutation, TokenAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TokenAuthMutation, TokenAuthMutationVariables>(TokenAuthDocument, options);
      }
export type TokenAuthMutationHookResult = ReturnType<typeof useTokenAuthMutation>;
export type TokenAuthMutationResult = Apollo.MutationResult<TokenAuthMutation>;
export type TokenAuthMutationOptions = Apollo.BaseMutationOptions<TokenAuthMutation, TokenAuthMutationVariables>;
export const VerifyTokenDocument = gql`
    mutation VerifyToken($token: String!) {
  verifyToken(token: $token) {
    success
    errors
    payload
  }
}
    `;
export type VerifyTokenMutationFn = Apollo.MutationFunction<VerifyTokenMutation, VerifyTokenMutationVariables>;

/**
 * __useVerifyTokenMutation__
 *
 * To run a mutation, you first call `useVerifyTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyTokenMutation, { data, loading, error }] = useVerifyTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyTokenMutation(baseOptions?: Apollo.MutationHookOptions<VerifyTokenMutation, VerifyTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyTokenMutation, VerifyTokenMutationVariables>(VerifyTokenDocument, options);
      }
export type VerifyTokenMutationHookResult = ReturnType<typeof useVerifyTokenMutation>;
export type VerifyTokenMutationResult = Apollo.MutationResult<VerifyTokenMutation>;
export type VerifyTokenMutationOptions = Apollo.BaseMutationOptions<VerifyTokenMutation, VerifyTokenMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation RefreshToken($refreshToken: String!) {
  refreshToken(refreshToken: $refreshToken) {
    success
    errors
    payload
    refreshExpiresIn
    token
    refreshToken
  }
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const RevokeTokenDocument = gql`
    mutation RevokeToken($refreshToken: String!) {
  revokeToken(refreshToken: $refreshToken) {
    success
    errors
  }
}
    `;
export type RevokeTokenMutationFn = Apollo.MutationFunction<RevokeTokenMutation, RevokeTokenMutationVariables>;

/**
 * __useRevokeTokenMutation__
 *
 * To run a mutation, you first call `useRevokeTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevokeTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revokeTokenMutation, { data, loading, error }] = useRevokeTokenMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRevokeTokenMutation(baseOptions?: Apollo.MutationHookOptions<RevokeTokenMutation, RevokeTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RevokeTokenMutation, RevokeTokenMutationVariables>(RevokeTokenDocument, options);
      }
export type RevokeTokenMutationHookResult = ReturnType<typeof useRevokeTokenMutation>;
export type RevokeTokenMutationResult = Apollo.MutationResult<RevokeTokenMutation>;
export type RevokeTokenMutationOptions = Apollo.BaseMutationOptions<RevokeTokenMutation, RevokeTokenMutationVariables>;
export const Send_EmailDocument = gql`
    mutation SEND_EMAIL($email: String!, $name: String!, $message: String!) {
  sendMail(email: $email, name: $name, message: $message) {
    success
  }
}
    `;
export type Send_EmailMutationFn = Apollo.MutationFunction<Send_EmailMutation, Send_EmailMutationVariables>;

/**
 * __useSend_EmailMutation__
 *
 * To run a mutation, you first call `useSend_EmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSend_EmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendEmailMutation, { data, loading, error }] = useSend_EmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useSend_EmailMutation(baseOptions?: Apollo.MutationHookOptions<Send_EmailMutation, Send_EmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Send_EmailMutation, Send_EmailMutationVariables>(Send_EmailDocument, options);
      }
export type Send_EmailMutationHookResult = ReturnType<typeof useSend_EmailMutation>;
export type Send_EmailMutationResult = Apollo.MutationResult<Send_EmailMutation>;
export type Send_EmailMutationOptions = Apollo.BaseMutationOptions<Send_EmailMutation, Send_EmailMutationVariables>;
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
export const Get_Game_Mast_By_UserDocument = gql`
    query GET_GAME_MAST_BY_USER($User: Int!) {
  gameByUser(user: $User) {
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
    }
  }
}
    `;

/**
 * __useGet_Game_Mast_By_UserQuery__
 *
 * To run a query within a React component, call `useGet_Game_Mast_By_UserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_Game_Mast_By_UserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_Game_Mast_By_UserQuery({
 *   variables: {
 *      User: // value for 'User'
 *   },
 * });
 */
export function useGet_Game_Mast_By_UserQuery(baseOptions: Apollo.QueryHookOptions<Get_Game_Mast_By_UserQuery, Get_Game_Mast_By_UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Get_Game_Mast_By_UserQuery, Get_Game_Mast_By_UserQueryVariables>(Get_Game_Mast_By_UserDocument, options);
      }
export function useGet_Game_Mast_By_UserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get_Game_Mast_By_UserQuery, Get_Game_Mast_By_UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Get_Game_Mast_By_UserQuery, Get_Game_Mast_By_UserQueryVariables>(Get_Game_Mast_By_UserDocument, options);
        }
export type Get_Game_Mast_By_UserQueryHookResult = ReturnType<typeof useGet_Game_Mast_By_UserQuery>;
export type Get_Game_Mast_By_UserLazyQueryHookResult = ReturnType<typeof useGet_Game_Mast_By_UserLazyQuery>;
export type Get_Game_Mast_By_UserQueryResult = Apollo.QueryResult<Get_Game_Mast_By_UserQuery, Get_Game_Mast_By_UserQueryVariables>;
export const Get_Game_Mast_By_IdDocument = gql`
    query GET_GAME_MAST_BY_ID($Id: Int!) {
  gameById(id: $Id) {
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
    }
  }
}
    `;

/**
 * __useGet_Game_Mast_By_IdQuery__
 *
 * To run a query within a React component, call `useGet_Game_Mast_By_IdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_Game_Mast_By_IdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_Game_Mast_By_IdQuery({
 *   variables: {
 *      Id: // value for 'Id'
 *   },
 * });
 */
export function useGet_Game_Mast_By_IdQuery(baseOptions: Apollo.QueryHookOptions<Get_Game_Mast_By_IdQuery, Get_Game_Mast_By_IdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Get_Game_Mast_By_IdQuery, Get_Game_Mast_By_IdQueryVariables>(Get_Game_Mast_By_IdDocument, options);
      }
export function useGet_Game_Mast_By_IdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get_Game_Mast_By_IdQuery, Get_Game_Mast_By_IdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Get_Game_Mast_By_IdQuery, Get_Game_Mast_By_IdQueryVariables>(Get_Game_Mast_By_IdDocument, options);
        }
export type Get_Game_Mast_By_IdQueryHookResult = ReturnType<typeof useGet_Game_Mast_By_IdQuery>;
export type Get_Game_Mast_By_IdLazyQueryHookResult = ReturnType<typeof useGet_Game_Mast_By_IdLazyQuery>;
export type Get_Game_Mast_By_IdQueryResult = Apollo.QueryResult<Get_Game_Mast_By_IdQuery, Get_Game_Mast_By_IdQueryVariables>;
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