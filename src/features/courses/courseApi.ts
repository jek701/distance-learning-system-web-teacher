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
            })
        }),
        getCourse: build.query<CourseResponse, string>({
            query: (id: string) => ({
                url: `/courses/${id}`,
                method: "GET"
            })
        }),
        getCourseByGroupId: build.query({
            query: (id: string) => ({
                url: `/courses/group/${id}`,
                method: "GET"
            })
        })
    })
})

export const {useGetAllCoursesQuery, useGetCourseQuery, useGetCourseByGroupIdQuery} = courseApi