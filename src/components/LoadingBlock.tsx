import React from "react"
import {createUseStyles, useTheme} from "react-jss"
import {GlobalToken} from "antd/es/theme/interface"
import {LoadingOutlined} from "@ant-design/icons"

const useStyles = createUseStyles<string, unknown, GlobalToken>(theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        border: `1px dashed ${theme.colorBorder}`,
        borderRadius: theme.borderRadius,
        marginBottom: "1rem"
    },
    icon: {
        fontSize: theme.fontSizeXL
    },
    text: {
        fontSize: theme.fontSize
    }
}))

const LoadingBlock = () => {
    const theme = useTheme<GlobalToken>()
    const classes = useStyles({theme})

    return (
        <div className={classes.container}>
            <div className={classes.icon}>
                <LoadingOutlined />
            </div>
            <div className={classes.text}>Загрузка...</div>
        </div>
    )
}

export default LoadingBlock
