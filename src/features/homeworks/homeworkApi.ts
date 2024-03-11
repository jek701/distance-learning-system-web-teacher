import {createApi} from "@reduxjs/toolkit/query/react"
import {apiConfig} from "../../utils/api-config"
import {ResponseHomework} from "../../types/Homework"

export const homeworkApi = createApi({
    reducerPath: "homeworkApi",
    baseQuery: apiConfig,
    tagTypes: ["homework"],
    endpoints: build => ({
        getHomeworksByCourseId: build.query<ResponseHomework, string>({
            query: (id) => ({
                url: `/homework-files/course/${id}`,
                method: "GET"
            }),
            providesTags: ["homework"]
        }),
        createHomework: build.mutation<{
            status: boolean
            message: {
                ru: string
                uz: string
            }
            data: []
        }, {
            course_id: string
            file: Blob | string | File
        }>({
            query: (data) => ({
                url: "/homework-files",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["homework"]
        }),
        deleteHomework: build.mutation<{
            status: boolean
            message: {
                ru: string
                uz: string
            }
            data: []
        }, string>({
            query: (id) => ({
                url: `/homework-files/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["homework"]
        })
    })
})

export const {
    useGetHomeworksByCourseIdQuery,
    useCreateHomeworkMutation,
    useDeleteHomeworkMutation
} = homeworkApi