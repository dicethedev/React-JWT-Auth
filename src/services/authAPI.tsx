import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const authAPI = createApi({
     reducerPath: 'authApi',
     baseQuery: fetchBaseQuery({
          baseUrl: 'https://testtourapp.herokuapp.com'
     }),
     endpoints: (builder) => ({
          // if is to GET the API.. use the builder.Query
          loginUser: builder.mutation({
               query: (body: {email: string, password: string}) => {
                    return {
                         url: '/users/signin',
                         method: "post",
                         body,
                    }
               }
          }),
          registerUser: builder.mutation({
               query: (body: { 
                     firstName: string,
                     lastName: string, 
                    email: string,   
                    password: string
                }) => {
                    return {
                         url: '/users/signup',
                         method: "post",
                         body,
                    }
               }
          })
     })
})

//useLoginUserMutation is default name that I named the hookname
export const { useLoginUserMutation, useRegisterUserMutation } = authAPI;

//After this setup.. I went to store.tsx in app folder