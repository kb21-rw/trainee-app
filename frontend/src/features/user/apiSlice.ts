import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api_url = import.meta.env.VITE_API_URL;

export const usersApi: any = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: api_url }),
  tagTypes: ["coaches", "trainees", "myTrainees", "profile"],
  endpoints: (builder) => ({
    getAllTrainees: builder.query({
      query: (args) => {
        const { jwt, query } = args;
        return {
          url: `/trainees/all${query}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        };
      },
      providesTags: ["trainees"],
    }),

    getMyTrainees: builder.query({
      query: (args) => {
        const { jwt, query } = args;
        return {
          url: `/trainees/my-trainees${query}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        };
      },
      providesTags: ["myTrainees"],
    }),
    getAllCoaches: builder.query({
      query: (args) => {
        const { jwt, query } = args;
        return {
          url: `/coaches/all${query}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        };
      },
      providesTags: ["coaches"],
    }),

    createCoach: builder.mutation({
      query: (args) => {
        const { jwt, body } = args;
        return {
          url: "/auth/register",
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          body: { ...body },
        };
      },
      invalidatesTags: ["coaches"],
    }),

    createTrainee: builder.mutation({
      query: (args) => {
        const { jwt, body } = args;
        return {
          url: "/auth/register",
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          body: { ...body },
        };
      },
      invalidatesTags: ["trainees"],
    }),
    editCoach: builder.mutation({
      query: (args) => {
        const { jwt, body, id } = args;
        return {
          url: `/users/edit-coach-or-admin/${id}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          body: { ...body },
        };
      },
      invalidatesTags: ["coaches"],
    }),

    editTrainee: builder.mutation({
      query: (args) => {
        const { jwt, body, id } = args;
        return {
          url: `/trainees/${id}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          body: { ...body },
        };
      },
      invalidatesTags: ["trainees", "myTrainees"],
    }),

    deleteCoach: builder.mutation({
      query: (args) => {
        const { jwt, id } = args;
        return {
          url: `/users/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        };
      },
      invalidatesTags: ["coaches"],
    }),

    deleteTrainee: builder.mutation({
      query: (args) => {
        const { jwt, id } = args;
        return {
          url: `/users/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        };
      },
      invalidatesTags: ["trainees"],
    }),

    login: builder.mutation({
      query: (body) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: { ...body },
        };
      },
      invalidatesTags: ["profile"],
    }),

    resetPassword: builder.mutation({
      query: (body) => {
        return {
          url: "/auth/reset-password",
          method: "POST",
          body,
        };
      },
    }),

    getProfile: builder.query({
      query: (jwt) => ({
        url: "/users/my-profile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }),
      providesTags: ["profile"],
    }),

    updateProfile: builder.mutation({
      query: (args) => {
        const { jwt, profileData } = args;
        return {
          url: "/users/my-profile",
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          body: { ...profileData },
        };
      },
      invalidatesTags: ["profile"],
    }),
  }),
});

export const {
  useGetAllTraineesQuery,
  useGetAllCoachesQuery,
  useCreateCoachMutation,
  useCreateTraineeMutation,
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useResetPasswordMutation,
  useDeleteCoachMutation,
  useDeleteTraineeMutation,
  useGetMyTraineesQuery,
  useEditCoachMutation,
  useEditTraineeMutation,
} = usersApi;
