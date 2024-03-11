import {configureStore} from "@reduxjs/toolkit"
import {useDispatch as useStoreDispatch} from "react-redux"
import authSlice from "./features/auth/authSlice"
import {authApi} from "./features/auth/authApi"
import {courseApi} from "./features/courses/courseApi"
import {homeworkApi} from "./features/homeworks/homeworkApi"
import {studentsApi} from "./features/students/studentsApi"
import {groupApi} from "./features/group/groupApi"
import {departmentApi} from "./features/department/departmentApi"
import {manualApi} from "./features/manuals/manualApi"

const reducers = {
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [homeworkApi.reducerPath]: homeworkApi.reducer,
    [studentsApi.reducerPath]: studentsApi.reducer,
    [groupApi.reducerPath]: groupApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [manualApi.reducerPath]: manualApi.reducer,
    auth: authSlice
}

const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware => getDefaultMiddleware({immutableCheck: false})
        .concat(authApi.middleware)
        .concat(courseApi.middleware)
        .concat(homeworkApi.middleware)
        .concat(studentsApi.middleware)
        .concat(groupApi.middleware)
        .concat(departmentApi.middleware)
        .concat(manualApi.middleware)
})

export type StoreState = ReturnType<typeof store.getState>
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch

export interface AppThunkProps {
    dispatch: AppDispatch;
    state: StoreState;
    extra?: unknown;
    rejectValue?: unknown;
}

export const useDispatch = () => useStoreDispatch<AppDispatch>()

export default store