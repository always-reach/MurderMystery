/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  loginUser?: Maybe<SignInUserMutation>;
};


export type MutationLoginUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

/**
 * Queryの実装
 * 命名規則としてstaticmethodがresolve_xxxとなる必要がある
 */
export type Query = {
  __typename?: 'Query';
  allUsers?: Maybe<Array<Maybe<UserType>>>;
  userByEmail?: Maybe<UserType>;
};


/**
 * Queryの実装
 * 命名規則としてstaticmethodがresolve_xxxとなる必要がある
 */
export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};

export type SignInUserMutation = {
  __typename?: 'SignInUserMutation';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  user?: Maybe<UserType>;
  username?: Maybe<Scalars['String']>;
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
