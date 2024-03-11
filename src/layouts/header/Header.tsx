import React, {useState} from "react"
import {createUseStyles, useTheme} from "react-jss"
import {GlobalToken} from "antd/es/theme/interface"
import HeaderLeftBlock from "./HeaderLeftBlock"
import HeaderTitle from "./HeaderTitle"
import HeaderRightBlock from "./HeaderRightBlock"
import HeaderDrawer from "./HeaderDrawer"

export type ListProps = {
    title: string
    link: string
    hidden?: boolean
}

interface NewHeaderProps {
    list?: ListProps[]
    extra?: React.ReactNode
    title?: string
}

const useStyles = createUseStyles<string, unknown, GlobalToken>(theme => ({
    header: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "20px",
        alignItems: "center",
        padding: "1rem 24px",
        borderBottom: `1px solid ${theme.colorBorder}`
    }
}))

const Header: React.FC<NewHeaderProps> = ({list, extra, title}) => {
    const theme = useTheme<GlobalToken>()
    const [active, setActive] = useState(false)
    const classes = useStyles({theme})

    const onOpenHandler = () => setActive(true)
    const onCloseHandler = () => setActive(false)

    return <>
        <div className={classes.header}>
            <HeaderLeftBlock onOpen={onOpenHandler} />
            <HeaderTitle title={title} />
            <HeaderRightBlock extra={extra} />
            <HeaderDrawer active={active} onClose={onCloseHandler} list={list} />
        </div>

    </>
}

export default Header
