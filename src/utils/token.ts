import Cookies from "js-cookie"

export const setToken = (token: string) => {
    Cookies.set("DISTANCE_LEARNING_SYSTEM_TEACHER", token)
}

export const getToken = () => {
    return Cookies.get("DISTANCE_LEARNING_SYSTEM_TEACHER")
}

export const removeToken = () => {
    Cookies.remove("DISTANCE_LEARNING_SYSTEM_TEACHER")
}