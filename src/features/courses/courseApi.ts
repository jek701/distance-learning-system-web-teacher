import {createApi} from "@reduxjs/toolkit/query/react"
import {apiConfig} from "../../utils/api-config"
import {CourseResponse, CoursesResponse} from "../../types/Course"

export const courseApi = createApi({
    reducerPath: "courseApi",
    baseQuery: apiConfig,
    tagTypes: ["course"],
    endpoints: build => ({
        getAllCourses: build.query<CoursesResponse, void>({
            query: () => ({
                url: "/courses",
                method: "GET"
            }),
            providesTags: ["course"]
        }),
        getCourse: build.query<CourseResponse, string>({
            query: (id: string) => ({
                url: `/courses/${id}`,
                method: "GET"
            }),
            providesTags: ["course"]
        }),
        getCourseByTeacherId: build.query<CoursesResponse, string | undefined>({
            query: (teacher_id?: string) => ({
                url: `/courses/teacher/${teacher_id}`,
                method: "GET"
            }),
            providesTags: ["course"]
        }),
        createManual: build.mutation<{
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
            query: (data) => {
                const formData = new FormData()
                formData.append("file", data.file)
                return {
                    url: `/manual-files/${data.course_id}`,
                    method: "POST",
                    body: formData
                }
            },
            invalidatesTags: ["course"]
        }),
        deleteManual: build.mutation<{
            status: boolean
            message: {
                ru: string
                uz: string
            }
            data: []
        }, string>({
            query: (id) => ({
                url: `/manual-files/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["course"]
        })
    })
})

export const {useGetAllCoursesQuery, useGetCourseQuery, useGetCourseByTeacherIdQuery, useCreateManualMutation, useDeleteManualMutation} = courseApi