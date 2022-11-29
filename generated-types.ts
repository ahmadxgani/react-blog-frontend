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

/** Author model */
export type Author = {
  __typename?: 'Author';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Float'];
  password: Scalars['String'];
  posts: Array<Post>;
  role: Roles;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type CreateAuthorInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type CreatePostInput = {
  content: Scalars['String'];
  draft?: InputMaybe<Scalars['Boolean']>;
  slug: Scalars['String'];
  tags?: InputMaybe<Array<Scalars['Int']>>;
  title: Scalars['String'];
};

export type CreateTagInput = {
  name: Scalars['String'];
};

export type DeleteAuthorInput = {
  id: Scalars['Int'];
};

export type DeletePostInput = {
  id: Scalars['Int'];
};

export type DeleteTagInput = {
  id: Scalars['Int'];
};

export type GetAuthorInput = {
  id: Scalars['Int'];
};

export type GetByTagInput = {
  name: Scalars['String'];
};

export type GetPostByIdInput = {
  slug: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginType = {
  __typename?: 'LoginType';
  email: Scalars['String'];
  expiresIn: Scalars['String'];
  id: Scalars['Int'];
  token: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateAuthor: Author;
  CreatePost: Post;
  CreateTag: Tag;
  DeleteAuthor: ResponseType;
  DeletePost: ResponseType;
  DeleteTag: ResponseType;
  UpdateAuthor: Author;
  UpdatePost: Post;
  UpdateTag: Tag;
  login: LoginType;
};


export type MutationCreateAuthorArgs = {
  payload: CreateAuthorInput;
};


export type MutationCreatePostArgs = {
  payload: CreatePostInput;
};


export type MutationCreateTagArgs = {
  payload: CreateTagInput;
};


export type MutationDeleteAuthorArgs = {
  payload: DeleteAuthorInput;
};


export type MutationDeletePostArgs = {
  payload: DeletePostInput;
};


export type MutationDeleteTagArgs = {
  payload: DeleteTagInput;
};


export type MutationUpdateAuthorArgs = {
  payload: UpdateAuthorInput;
};


export type MutationUpdatePostArgs = {
  payload: UpdatePostInput;
};


export type MutationUpdateTagArgs = {
  payload: UpdateTagInput;
};


export type MutationLoginArgs = {
  payload: LoginInput;
};

/** Post model */
export type Post = {
  __typename?: 'Post';
  author: Author;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  likes: Scalars['Int'];
  slug: Scalars['String'];
  tags: Array<Tag>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  GetAuthorById: Author;
  GetPost: Post;
  ShowAllAuthor: Array<Author>;
  ShowAllPost: Array<Post>;
  ShowAllTag: Array<Tag>;
  ShowByTag: Tag;
};


export type QueryGetAuthorByIdArgs = {
  payload: GetAuthorInput;
};


export type QueryGetPostArgs = {
  payload: GetPostByIdInput;
};


export type QueryShowByTagArgs = {
  payload: GetByTagInput;
};

/** Return Response Type */
export type ResponseType = {
  __typename?: 'ResponseType';
  success: Scalars['Boolean'];
};

/** Tag model */
export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Int'];
  name: Scalars['String'];
  posts: Array<Post>;
};

export type UpdateAuthorInput = {
  id: Scalars['Int'];
  username: Scalars['String'];
};

export type UpdatePostInput = {
  content: Scalars['String'];
  draft?: InputMaybe<Scalars['Boolean']>;
  slug: Scalars['String'];
  tags?: InputMaybe<Array<Scalars['Int']>>;
  title: Scalars['String'];
};

export type UpdateTagInput = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export enum Roles {
  Admin = 'admin',
  Member = 'member'
}

export type CreatePostMutationVariables = Exact<{
  content: Scalars['String'];
  tags?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
  slug: Scalars['String'];
  title: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', CreatePost: { __typename?: 'Post', slug: string } };

export type UpdatePostMutationVariables = Exact<{
  content: Scalars['String'];
  tags?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
  slug: Scalars['String'];
  title: Scalars['String'];
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', UpdatePost: { __typename?: 'Post', slug: string } };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', DeletePost: { __typename?: 'ResponseType', success: boolean } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginType', id: number, token: string, username: string, email: string } };

export type CreateTagMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateTagMutation = { __typename?: 'Mutation', CreateTag: { __typename?: 'Tag', name: string, id: number } };

export type UpdateTagMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
}>;


export type UpdateTagMutation = { __typename?: 'Mutation', UpdateTag: { __typename?: 'Tag', name: string, id: number } };

export type UpdateAuthorMutationVariables = Exact<{
  id: Scalars['Int'];
  username: Scalars['String'];
}>;


export type UpdateAuthorMutation = { __typename?: 'Mutation', UpdateAuthor: { __typename?: 'Author', id: number, username: string, email: string } };

export type DeleteTagMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteTagMutation = { __typename?: 'Mutation', DeleteTag: { __typename?: 'ResponseType', success: boolean } };

export type GetPostQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetPostQuery = { __typename?: 'Query', GetPost: { __typename?: 'Post', title: string, content: string, slug: string, createdAt: any, updatedAt: any, author: { __typename?: 'Author', username: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string }> } };

export type LoadPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type LoadPostsQuery = { __typename?: 'Query', ShowAllPost: Array<{ __typename?: 'Post', title: string, slug: string, tags: Array<{ __typename?: 'Tag', name: string }> }> };

export type LoadPostsByAuthorQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type LoadPostsByAuthorQuery = { __typename?: 'Query', GetAuthorById: { __typename?: 'Author', posts: Array<{ __typename?: 'Post', title: string, slug: string, tags: Array<{ __typename?: 'Tag', name: string }> }> } };

export type ShowAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type ShowAllUsersQuery = { __typename?: 'Query', ShowAllAuthor: Array<{ __typename?: 'Author', id: number, username: string, email: string }> };

export type ShowAllTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type ShowAllTagsQuery = { __typename?: 'Query', ShowAllTag: Array<{ __typename?: 'Tag', name: string, id: number }> };


export const CreatePostDocument = gql`
    mutation CreatePost($content: String!, $tags: [Int!], $slug: String!, $title: String!) {
  CreatePost(
    payload: {title: $title, content: $content, tags: $tags, slug: $slug}
  ) {
    slug
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      content: // value for 'content'
 *      tags: // value for 'tags'
 *      slug: // value for 'slug'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($content: String!, $tags: [Int!], $slug: String!, $title: String!) {
  UpdatePost(
    payload: {title: $title, content: $content, tags: $tags, slug: $slug}
  ) {
    slug
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      content: // value for 'content'
 *      tags: // value for 'tags'
 *      slug: // value for 'slug'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: Int!) {
  DeletePost(payload: {id: $id}) {
    success
  }
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(payload: {email: $email, password: $password}) {
    id
    token
    username
    email
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CreateTagDocument = gql`
    mutation CreateTag($name: String!) {
  CreateTag(payload: {name: $name}) {
    name
    id
  }
}
    `;
export type CreateTagMutationFn = Apollo.MutationFunction<CreateTagMutation, CreateTagMutationVariables>;

/**
 * __useCreateTagMutation__
 *
 * To run a mutation, you first call `useCreateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTagMutation, { data, loading, error }] = useCreateTagMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateTagMutation(baseOptions?: Apollo.MutationHookOptions<CreateTagMutation, CreateTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument, options);
      }
export type CreateTagMutationHookResult = ReturnType<typeof useCreateTagMutation>;
export type CreateTagMutationResult = Apollo.MutationResult<CreateTagMutation>;
export type CreateTagMutationOptions = Apollo.BaseMutationOptions<CreateTagMutation, CreateTagMutationVariables>;
export const UpdateTagDocument = gql`
    mutation UpdateTag($id: Int!, $name: String!) {
  UpdateTag(payload: {id: $id, name: $name}) {
    name
    id
  }
}
    `;
export type UpdateTagMutationFn = Apollo.MutationFunction<UpdateTagMutation, UpdateTagMutationVariables>;

/**
 * __useUpdateTagMutation__
 *
 * To run a mutation, you first call `useUpdateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTagMutation, { data, loading, error }] = useUpdateTagMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateTagMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTagMutation, UpdateTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTagMutation, UpdateTagMutationVariables>(UpdateTagDocument, options);
      }
export type UpdateTagMutationHookResult = ReturnType<typeof useUpdateTagMutation>;
export type UpdateTagMutationResult = Apollo.MutationResult<UpdateTagMutation>;
export type UpdateTagMutationOptions = Apollo.BaseMutationOptions<UpdateTagMutation, UpdateTagMutationVariables>;
export const UpdateAuthorDocument = gql`
    mutation UpdateAuthor($id: Int!, $username: String!) {
  UpdateAuthor(payload: {id: $id, username: $username}) {
    id
    username
    email
  }
}
    `;
export type UpdateAuthorMutationFn = Apollo.MutationFunction<UpdateAuthorMutation, UpdateAuthorMutationVariables>;

/**
 * __useUpdateAuthorMutation__
 *
 * To run a mutation, you first call `useUpdateAuthorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAuthorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAuthorMutation, { data, loading, error }] = useUpdateAuthorMutation({
 *   variables: {
 *      id: // value for 'id'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUpdateAuthorMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAuthorMutation, UpdateAuthorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAuthorMutation, UpdateAuthorMutationVariables>(UpdateAuthorDocument, options);
      }
export type UpdateAuthorMutationHookResult = ReturnType<typeof useUpdateAuthorMutation>;
export type UpdateAuthorMutationResult = Apollo.MutationResult<UpdateAuthorMutation>;
export type UpdateAuthorMutationOptions = Apollo.BaseMutationOptions<UpdateAuthorMutation, UpdateAuthorMutationVariables>;
export const DeleteTagDocument = gql`
    mutation DeleteTag($id: Int!) {
  DeleteTag(payload: {id: $id}) {
    success
  }
}
    `;
export type DeleteTagMutationFn = Apollo.MutationFunction<DeleteTagMutation, DeleteTagMutationVariables>;

/**
 * __useDeleteTagMutation__
 *
 * To run a mutation, you first call `useDeleteTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTagMutation, { data, loading, error }] = useDeleteTagMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTagMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTagMutation, DeleteTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTagMutation, DeleteTagMutationVariables>(DeleteTagDocument, options);
      }
export type DeleteTagMutationHookResult = ReturnType<typeof useDeleteTagMutation>;
export type DeleteTagMutationResult = Apollo.MutationResult<DeleteTagMutation>;
export type DeleteTagMutationOptions = Apollo.BaseMutationOptions<DeleteTagMutation, DeleteTagMutationVariables>;
export const GetPostDocument = gql`
    query GetPost($slug: String!) {
  GetPost(payload: {slug: $slug}) {
    author {
      username
    }
    title
    content
    slug
    createdAt
    updatedAt
    tags {
      id
      name
    }
  }
}
    `;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetPostQuery(baseOptions: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
      }
export function useGetPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = Apollo.QueryResult<GetPostQuery, GetPostQueryVariables>;
export const LoadPostsDocument = gql`
    query LoadPosts {
  ShowAllPost {
    title
    slug
    tags {
      name
    }
  }
}
    `;

/**
 * __useLoadPostsQuery__
 *
 * To run a query within a React component, call `useLoadPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoadPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoadPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoadPostsQuery(baseOptions?: Apollo.QueryHookOptions<LoadPostsQuery, LoadPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoadPostsQuery, LoadPostsQueryVariables>(LoadPostsDocument, options);
      }
export function useLoadPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoadPostsQuery, LoadPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoadPostsQuery, LoadPostsQueryVariables>(LoadPostsDocument, options);
        }
export type LoadPostsQueryHookResult = ReturnType<typeof useLoadPostsQuery>;
export type LoadPostsLazyQueryHookResult = ReturnType<typeof useLoadPostsLazyQuery>;
export type LoadPostsQueryResult = Apollo.QueryResult<LoadPostsQuery, LoadPostsQueryVariables>;
export const LoadPostsByAuthorDocument = gql`
    query LoadPostsByAuthor($id: Int!) {
  GetAuthorById(payload: {id: $id}) {
    posts {
      title
      slug
      tags {
        name
      }
    }
  }
}
    `;

/**
 * __useLoadPostsByAuthorQuery__
 *
 * To run a query within a React component, call `useLoadPostsByAuthorQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoadPostsByAuthorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoadPostsByAuthorQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLoadPostsByAuthorQuery(baseOptions: Apollo.QueryHookOptions<LoadPostsByAuthorQuery, LoadPostsByAuthorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoadPostsByAuthorQuery, LoadPostsByAuthorQueryVariables>(LoadPostsByAuthorDocument, options);
      }
export function useLoadPostsByAuthorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoadPostsByAuthorQuery, LoadPostsByAuthorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoadPostsByAuthorQuery, LoadPostsByAuthorQueryVariables>(LoadPostsByAuthorDocument, options);
        }
export type LoadPostsByAuthorQueryHookResult = ReturnType<typeof useLoadPostsByAuthorQuery>;
export type LoadPostsByAuthorLazyQueryHookResult = ReturnType<typeof useLoadPostsByAuthorLazyQuery>;
export type LoadPostsByAuthorQueryResult = Apollo.QueryResult<LoadPostsByAuthorQuery, LoadPostsByAuthorQueryVariables>;
export const ShowAllUsersDocument = gql`
    query ShowAllUsers {
  ShowAllAuthor {
    id
    username
    email
  }
}
    `;

/**
 * __useShowAllUsersQuery__
 *
 * To run a query within a React component, call `useShowAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useShowAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShowAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useShowAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<ShowAllUsersQuery, ShowAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShowAllUsersQuery, ShowAllUsersQueryVariables>(ShowAllUsersDocument, options);
      }
export function useShowAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowAllUsersQuery, ShowAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShowAllUsersQuery, ShowAllUsersQueryVariables>(ShowAllUsersDocument, options);
        }
export type ShowAllUsersQueryHookResult = ReturnType<typeof useShowAllUsersQuery>;
export type ShowAllUsersLazyQueryHookResult = ReturnType<typeof useShowAllUsersLazyQuery>;
export type ShowAllUsersQueryResult = Apollo.QueryResult<ShowAllUsersQuery, ShowAllUsersQueryVariables>;
export const ShowAllTagsDocument = gql`
    query ShowAllTags {
  ShowAllTag {
    name
    id
  }
}
    `;

/**
 * __useShowAllTagsQuery__
 *
 * To run a query within a React component, call `useShowAllTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useShowAllTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShowAllTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useShowAllTagsQuery(baseOptions?: Apollo.QueryHookOptions<ShowAllTagsQuery, ShowAllTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShowAllTagsQuery, ShowAllTagsQueryVariables>(ShowAllTagsDocument, options);
      }
export function useShowAllTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowAllTagsQuery, ShowAllTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShowAllTagsQuery, ShowAllTagsQueryVariables>(ShowAllTagsDocument, options);
        }
export type ShowAllTagsQueryHookResult = ReturnType<typeof useShowAllTagsQuery>;
export type ShowAllTagsLazyQueryHookResult = ReturnType<typeof useShowAllTagsLazyQuery>;
export type ShowAllTagsQueryResult = Apollo.QueryResult<ShowAllTagsQuery, ShowAllTagsQueryVariables>;