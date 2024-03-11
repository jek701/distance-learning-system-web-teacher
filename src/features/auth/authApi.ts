import {createApi} from "@reduxjs/toolkit/query/react"
import {apiConfig} from "../../utils/api-config"
import {TeacherResponse} from "../../types/Teacher"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: apiConfig,
    tagTypes: ["auth"],
    endpoints: build => ({
        login: build.mutation<{
            token: string
        }, {
            username: string,
            password: string
        }>({
            query: (data) => ({
                url: "/login/teacher",
                method: "POST",
                body: data
            })
        }),
        getMe: build.query<TeacherResponse, void>({
            query: () => ({
                url: "/teacher/me",
                method: "GET"
            })
        })
    })
})

export const {useLoginMutation, useGetMeQuery} = authApi