import React from "react"
import {createUseStyles} from "react-jss"
import {GlobalToken} from "antd/es/theme/interface"

const useStyles = createUseStyles<string, {active: boolean}, GlobalToken>(theme => ({
    title: {
        fontSize: theme.fontSize,
        fontWeight: "bold",
        margin: 0,
        textAlign: "center"
    }
}))

interface HeaderTitleProps {
    title?: string;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({title}) => {
    const classes = useStyles()

    return <p className={classes.title}>{title || ""}</p>
}

export default HeaderTitle
