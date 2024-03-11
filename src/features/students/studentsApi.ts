import {createApi} from "@reduxjs/toolkit/query/react"
import {apiConfig} from "../../utils/api-config"
import {Student} from "../../types/Student"

export const studentsApi = createApi({
    reducerPath: "studentsApi",
    baseQuery: apiConfig,
    tagTypes: ["Students"],
    endpoints: (builder) => ({
        getAllStudents: builder.query<{
            status: boolean
            message: {
                ru: string
                uz: string
            }
            data: Student[]
        }, void>({
            query: () => "students",
            providesTags: ["Students"]
        }),
        getAllStudentsByGroup: builder.query<{
            status: boolean
            message: {
                ru: string
                uz: string
            }
            data: Student[]
        }, string>({
            query: (group) => `students/group/${group}`,
            providesTags: ["Students"]
        }),
    })
})

export const {useGetAllStudentsQuery, useGetAllStudentsByGroupQuery} = studentsApi