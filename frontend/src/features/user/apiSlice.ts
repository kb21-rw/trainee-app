import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import Cookies from "universal-cookie";

const api_url = import.meta.env.VITE_API_URL;

const cookies = new Cookies()
const jwt = cookies.get("jwt")
console.log({jwt})

export  const usersApi:any = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({baseUrl: api_url}),
    tagTypes: ["coaches"],
    endpoints: (builder)=>({
        getAllTrainees: builder.query({
            query: (jwt) => ({
                url: '/auth/trainees',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }),
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
               console.log({jwt, body})
                return ({
                url: '/auth/register',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
                body: {...body}
            })}, 
            invalidatesTags: ["coaches"]
        })
    })
})

export const { useGetAllTraineesQuery, useGetAllCoachesQuery, useCreateCoachMutation } = usersApi