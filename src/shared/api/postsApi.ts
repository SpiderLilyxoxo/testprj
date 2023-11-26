import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Item {
  id: string;
}

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (build) => ({
    getPosts: build.query<any, any>({
      query: (page: number) => `/posts?_page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getSinglePost: build.query<Posts, object>({
      query: (el: Item) => `/posts/${el.id}`,
    }),
  }),
});

export const { useGetPostsQuery, useGetSinglePostQuery } = postsApi;
