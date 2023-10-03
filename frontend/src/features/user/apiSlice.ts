import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import Cookies from "universal-cookie";

const api_url = import.meta.env.VITE_API_URL;

const cookies = new Cookies()
const jwt = cookies.get("jwt")

export  const usersApi:any = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({baseUrl: api_url}),
    tagTypes: ["coaches", "trainees", "users"],
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
        })

    })
})

export const { useGetAllTraineesQuery, useGetAllCoachesQuery, useCreateCoachMutation, useCreateTraineeMutation, useEditUserMutation, useGetAllUsersQuery } = usersApi