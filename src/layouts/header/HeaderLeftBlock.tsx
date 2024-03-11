import React from "react"
import {createUseStyles} from "react-jss"

const useStyles = createUseStyles({
    firstNavBlock: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "15px"
    },
    logo: {
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
    burgerBtn: {
        width: "35px",
        height: "35px",
        borderRadius: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        gap: "4px",
        border: `1px solid #145839`,
        "& span": {
            width: "15px",
            height: "2px",
            background: "#145839",
            display: "block"
        }
    }

})

interface HeaderLeftBlockProps {
    onOpen: () => void
}

const HeaderLeftBlock: React.FC<HeaderLeftBlockProps> = ({onOpen}) => {
    const classes = useStyles()

    return (
        <div className={classes.firstNavBlock}>
            <div onClick={onOpen} className={classes.burgerBtn}>
                <span />
                <span />
                <span />
            </div>
        </div>
    )
}

export default HeaderLeftBlock
