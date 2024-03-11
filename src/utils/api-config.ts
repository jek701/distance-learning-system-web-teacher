// Настойки для API Review
import {fetchBaseQuery} from "@reduxjs/toolkit/query"
import {getToken} from "./token"

export const apiConfig = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API,
    prepareHeaders: (headers) => {
        const token = getToken()

        if (token) headers.set("Authorization", `Bearer ${token}`)
        return headers
    }
})