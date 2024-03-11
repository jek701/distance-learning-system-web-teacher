import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import {ConfigProvider} from "antd"
import {Provider} from "react-redux"
import store from "./store"
import "antd/dist/reset.css"
import ThemeProvider from "./layouts/ThemeProvider"
import "./assets/styles/font-face.css"
import "./assets/styles/globals.css"
import locale from "antd/locale/ru_RU"

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
)
root.render(
    <React.StrictMode>
        <ConfigProvider
            locale={locale}
            theme={{
                token: {
                    colorPrimary: "#006f4c",
                    colorText: "#26282d",
                    colorLink: "#006f4c",
                    colorPrimaryBg: "rgba(212, 254, 224, 1)",
                    fontSize: 16,
                    fontSizeSM: 14,
                    colorBgLayout: "#e3e4e4",
                    colorBorder: "#e3e4e4",
                    red: "#ff2837",
                    orange: "#ffc428"
                },
                components: {
                    Layout: {
                        colorBgLayout: "#FFF",
                        colorBgContainer: "#FFF"
                    },
                    Radio: {
                        colorPrimary: "#ff2837"
                    },
                    Select: {
                        colorFillSecondary: "#f1d5ab"
                    }
                }
            }}
        >
            <Provider store={store}>
                <ThemeProvider>
                    <App/>
                </ThemeProvider>
            </Provider>
        </ConfigProvider>
    </React.StrictMode>
)
