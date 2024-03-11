import {createApi} from "@reduxjs/toolkit/query/react"
import {apiConfig} from "../../utils/api-config"

export const manualApi = createApi({
    reducerPath: "manualApi",
    baseQuery: apiConfig,
    tagTypes: ["manual"],
    endpoints: build => ({
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
            invalidatesTags: ["manual"]
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
            invalidatesTags: ["manual"]
        })
    })
})

export const {useCreateManualMutation, useDeleteManualMutation} = manualApi