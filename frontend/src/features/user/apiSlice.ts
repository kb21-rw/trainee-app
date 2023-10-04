import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import Cookies from "universal-cookie";

const api_url = import.meta.env.VITE_API_URL;

const cookies = new Cookies()
const jwt = cookies.get("jwt")

export  const usersApi:any = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({baseUrl: api_url}),
    tagTypes: ["coaches", "trainees", "myTrainees", "profile", "users"],
    endpoints: (builder)=>({
        getAllTrainees: builder.query({
            query: (jwt) => ({
                url: '/auth/trainees',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }),
            providesTags: ["trainees"]
        }),
        getMyTrainees: builder.query({
            query: (jwt) => ({
                url: '/auth/my-trainees',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }),
            providesTags: ["myTrainees"]
        }),
        getAllUsers: builder.query({
            query: (jwt) => ({
                url: '/auth/users',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }),
            providesTags: ["users"]
        }),
        getAllCoaches: builder.query({
            query: (jwt) => ({
                url: '/auth/coaches',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }),
            providesTags: ["coaches"]
        }),
        createCoach: builder.mutation({
            query: (args) => {
                const {jwt, body} = args
                return ({
                url: '/auth/register',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
                body: {...body}
            })}, 
            invalidatesTags: ["coaches"]
        }),
        createTrainee: builder.mutation({
            query: (args) => {
                const {jwt, body} = args
                return ({
                url: '/auth/register',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
                body: {...body}
            })}, 
            invalidatesTags: ["trainees"]
        }),
        editUser: builder.mutation({
            query: (args) => {
                const {jwt, body, id} = args
                return ({
                url: `/auth/edit-user/${id}`,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
                body: {...body}
            })}, 
            invalidatesTags: ["users"]
        }),
        editTrainee: builder.mutation({
            query: (args) => {
                const {jwt, body, id} = args
                return ({
                url: `/auth/edit-trainee/${id}`,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
                body: {...body}
            })}, 
            invalidatesTags: ["trainees"]
        }),

        deleteCoach: builder.mutation({
            query: (args) => {
                const {jwt, id} = args
                return ({
                url: `/auth/users/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })}, 
            invalidatesTags: ["users",]
        }),
        deleteTrainee: builder.mutation({
            query: (args) => {
                const {jwt, id} = args
                return ({
                url: `/auth/users/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })}, 
            invalidatesTags: ["trainees",]
        }),

        login: builder.mutation({
            query: (body) => {
                return ({
                url: '/auth/login',
                method: 'POST',
                body: {...body}
            })}, 
            invalidatesTags: ["profile"]
        }),
        resetPassword: builder.mutation({
            query: (body) => {
                return ({
                url: '/auth/reset-password',
                method: 'POST',
                body
            })}, 
        }),
        getProfile: builder.query({
            query: (jwt) => ({
                url: '/auth/profile',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }),
            providesTags: ["profile"]
        }),
        updateProfile: builder.mutation({
            query: (args) => {
                const {jwt, profileData} = args
                console.log({args})
                return ({
                url: '/auth/profile',
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
                body: {...profileData}
            })}, 
            invalidatesTags: ["profile"]
        }),
    })
})

export const { useGetAllTraineesQuery, useGetAllCoachesQuery, useCreateCoachMutation, useCreateTraineeMutation, useLoginMutation, useGetProfileQuery, useUpdateProfileMutation, useResetPasswordMutation, useDeleteCoachMutation, useDeleteTraineeMutation, useGetMyTraineesQuery, useEditUserMutation, useGetAllUsersQuery, useEditTraineeMutation  } = usersApi
