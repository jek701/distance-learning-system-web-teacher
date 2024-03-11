import {createApi} from "@reduxjs/toolkit/query/react"
import {apiConfig} from "../../utils/api-config"
import {GroupsResponse} from "../../types/Group"

export const groupApi = createApi({
    reducerPath: "groupApi",
    baseQuery: apiConfig,
    tagTypes: ["Group"],
    endpoints: (builder) => ({
        getGroups: builder.query<GroupsResponse, void>({
            query: () => "groups",
            providesTags: ["Group"],
        }),
        getGroup: builder.query({
            query: (id) => `groups/${id}`,
            providesTags: ["Group"],
        }),
        createGroup: builder.mutation({
            query: (group) => ({
                url: "groups",
                method: "POST",
                body: group,
            }),
            invalidatesTags: ["Group"],
        }),
        updateGroup: builder.mutation({
            query: (group) => ({
                url: `groups/${group.id}`,
                method: "PUT",
                body: group,
            }),
            invalidatesTags: ["Group"],
        }),
        deleteGroup: builder.mutation({
            query: (id) => ({
                url: `groups/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Group"],
        }),
    }),
})

export const {
    useGetGroupsQuery,
    useGetGroupQuery,
    useCreateGroupMutation,
    useUpdateGroupMutation,
    useDeleteGroupMutation,
} = groupApi