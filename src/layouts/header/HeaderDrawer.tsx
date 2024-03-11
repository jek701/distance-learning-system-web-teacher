import React from "react"
import {Link} from "react-router-dom"
import {createUseStyles, useTheme} from "react-jss"
import {GlobalToken} from "antd/es/theme/interface"
import {ListProps} from "./Header"
import LeftArrowButton from "../../components/LeftArrowButton"

const useStyles = createUseStyles<string, {active: boolean}, GlobalToken>(theme => ({
    menuDrawer: {
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 999,
        pointerEvents: (props) => props.active ? "inherit" : "none"
    },
    bg: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 998,
        background: "rgba(0, 0, 0, .2)",
        backdropFilter: "blur(4px)",
        opacity: (props) => props.active ? 1 : 0,
        transition: "all .15s ease"
    },
    menuListBlock: {
        position: "absolute",
        left: (props) => props.active ? 0 : "-100%",
        top: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        background: "#fff",
        width: "max-content",
        padding: "15px 55px",
        boxShadow: "12px 0px 47px rgba(0, 0, 0, 0.1)",
        borderRadius: "0px 20px 20px 0px",
        zIndex: 999,
        transition: "all .15s ease",
        transform: "translateX(0)"
    },
    listItem: {
        padding: "15px 0",
        width: "100%",
        fontWeight: 400,
        fontSize: theme.fontSize,
        lineHeight: "20px",
        cursor: "pointer",
        color: "#1E1E1E",
        borderBottom: "1px solid rgba(181, 181, 181, .3)",
        transition: "all .15s ease",
        "&:hover": {
            padding: "20px 0",
            fontSize: theme.fontSize,
            color: theme.colorPrimary
        }
    },
    menuLogo: {
        height: "38.11px",
        width: "156.79px",
        cursor: "pointer",
        "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            verticalAlign: "top"
        }
    },
    wrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "75px",
        borderBottom: "1px solid rgba(181, 181, 181, .3)",
        padding: "25px 0",
        marginBottom: "10px"
    },
    closeNavBtn: {
        width: "64px",
        height: "27px",
        background: "#fff",
        borderRadius: "20px",
        border: "1px solid #145839",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}))


interface DrawerMenuProps {
    active: boolean
    onClose: () => void
    list?: ListProps[]
}

const HeaderDrawer: React.FC<DrawerMenuProps> = ({active, onClose, list}) => {
    const theme = useTheme<GlobalToken>()
    const classes = useStyles({theme, active: active})

    return (
        <div className={classes.menuDrawer}>
            <div onClick={onClose} className={classes.bg} />
            <div className={classes.menuListBlock}>
                <div className={classes.wrapper}>
                    {/*<div className={classes.menuLogo} onClick={onClickHandler}>*/}
                    {/*    <img src="/images/logo.png" alt="Bellissimo Pizza logo" />*/}
                    {/*</div>*/}
                    <LeftArrowButton onClick={onClose} />
                </div>
                {list && list
                    .filter(item => !item.hidden)
                    .map((item, index) => (
                        <Link key={index} to={item.link} onClick={onClose} className={classes.listItem}>
                            {item.title}
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default HeaderDrawer
