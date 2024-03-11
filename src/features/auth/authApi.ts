import {createApi} from "@reduxjs/toolkit/query/react"
import {apiConfig} from "../../utils/api-config"
import {Student} from "../../types/Student"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: apiConfig,
    tagTypes: ["auth"],
    endpoints: build => ({
        login: build.mutation<{
            token: string
        }, {
            student_card_number: string,
            password: string
        }>({
            query: (data) => ({
                url: "/login/student",
                method: "POST",
                body: data
            })
        }),
        getMe: build.query<{
            status: boolean
            message: {
                ru: string
                uz: string
            }
            data: Student
        }, void>({
            query: () => ({
                url: "/student/me",
                method: "GET"
            })
        })
    })
})

export const {useLoginMutation, useGetMeQuery} = authApi