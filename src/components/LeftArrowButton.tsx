import React from "react"
import {createUseStyles, useTheme} from "react-jss"
import {GlobalToken} from "antd/es/theme/interface"

interface LeftArrowButtonProps {
    onClick: () => void,
    title?: string,
    margin?: string
}

const useStyles = createUseStyles<string, {margin?: string}, GlobalToken>(theme => ({
    button: {
        width: "max-content",
        padding: "10px 20px",
        background: "#fff",
        borderRadius: "50px",
        border: "1px solid #145839",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: ({margin}) => (margin ? margin : "0px")
    },
    title: {
        marginLeft: "15px",
        color: theme.colorPrimary,
        fontSize: theme.fontSize,
    }
}))

const LeftArrowButton: React.FC<LeftArrowButtonProps> = ({onClick, title, margin}) => {
    const theme = useTheme<GlobalToken>()
    const classes = useStyles({theme, margin})
    return (
        <div onClick={onClick} className={classes.button}>
            <img alt="back button icon" src={"/images/arrow-long-nav.svg"} />
            {title && <span className={classes.title}>{title}</span>}
        </div>
    )
}

export default LeftArrowButton