import {createApi} from "@reduxjs/toolkit/query/react"
import {apiConfig} from "../../utils/api-config"
import {Department, DepartmentsResponse} from "../../types/Department"

export const departmentApi = createApi({
    reducerPath: "departmentApi",
    baseQuery: apiConfig,
    tagTypes: ["Department"],
    endpoints: (builder) => ({
        getDepartments: builder.query<DepartmentsResponse, void>({
            query: () => "departments",
            providesTags: ["Department"],
        }),
        getDepartment: builder.query<{
            status: boolean
            message: {
                ru: string
                uz: string
            }
            data: Department
        }, string | undefined>({
            query: (id) => `departments/${id}`,
            providesTags: ["Department"],
        }),
        createDepartment: builder.mutation({
            query: (department) => ({
                url: "departments",
                method: "POST",
                body: department,
            }),
            invalidatesTags: ["Department"],
        }),
        updateDepartment: builder.mutation({
            query: (department) => ({
                url: `departments/${department.id}`,
                method: "PUT",
                body: department,
            }),
            invalidatesTags: ["Department"],
        }),
        deleteDepartment: builder.mutation({
            query: (id) => ({
                url: `departments/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Department"],
        }),
    }),
})

export const {
    useGetDepartmentsQuery,
    useGetDepartmentQuery,
    useCreateDepartmentMutation,
    useUpdateDepartmentMutation,
    useDeleteDepartmentMutation,
} = departmentApi