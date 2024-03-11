import React, {useEffect} from "react"
import {Layout as AntdLayout} from "antd"
import {createUseStyles} from "react-jss"
import {Link, useLocation} from "react-router-dom"
import Header, {ListProps} from "./header/Header"
import {getToken} from "../utils/token"

const {Content} = AntdLayout

const useStyles = createUseStyles({
    layout: {
        background: "#ffffff"
    },
    content: {
        margin: "0",
        padding: 24,
        minHeight: 280
    },
    "@media (min-width: 1200px)": {
        content: {
            margin: "0",
            padding: 24,
            minHeight: 280
        }
    }
})

interface LayoutProps {
    children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    const classes = useStyles()
    const location = useLocation()
    const token = getToken()

    const list: ListProps[] = [
        {
            title: "Главная",
            link: "/"
        },
        {
            title: "Курсы",
            link: "/courses"
        }
    ]

    useEffect(() => {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    }, [location])

    return (
        <AntdLayout className={classes.layout}>
            <Header extra={!token && <Link to={"/login"}>Войти</Link>} title={"Система менеджер заказов"} list={token ? list : [{
                title: "Войти",
                link: "/login"
            }]}/>
            <Content className={classes.content}>
                {children}
            </Content>
        </AntdLayout>
    )
}

export default Layout
