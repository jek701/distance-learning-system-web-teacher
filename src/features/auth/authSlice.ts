import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {useSelector} from "react-redux"
import {StoreState} from "../../store"

export interface StateProps {
    token: string | null;
}

const initialState: StateProps = {
    token: null
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        // Изменить токен
        updateToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        }
    }
})

export default authSlice.reducer
// Обновить токен
export const {updateToken} = authSlice.actions
// Получить токен
export const useGetAuthToken = () => useSelector((state: StoreState) => state.auth.token)
