import Cookies from "js-cookie"

export const setToken = (token: string) => {
    Cookies.set("DISTANCE_LEARNING_SYSTEM", token)
}

export const getToken = () => {
    return Cookies.get("DISTANCE_LEARNING_SYSTEM")
}

export const removeToken = () => {
    Cookies.remove("DISTANCE_LEARNING_SYSTEM")
}