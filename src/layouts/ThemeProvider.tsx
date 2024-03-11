import React from "react"
import {ThemeProvider as ReactThemeProvider} from "react-jss"
import {theme} from "antd"

const {useToken} = theme

interface ThemeProviderProps {
    children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
    const {token} = useToken()
    return <ReactThemeProvider theme={token}>{children}</ReactThemeProvider>
}

export default ThemeProvider
