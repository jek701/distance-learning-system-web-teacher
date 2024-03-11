import React from "react"
import {Avatar, Dropdown, Modal} from "antd"
import {PoweroffOutlined, UserOutlined} from "@ant-design/icons"
import {createUseStyles} from "react-jss"
import {useGetMeQuery} from "../../features/auth/authApi"
import {removeToken} from "../../utils/token"
import {useNavigate} from "react-router-dom"
import {useGetDepartmentsQuery} from "../../features/department/departmentApi"


const useStyles = createUseStyles({
    firstNavBlock: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "15px"
    }
})

interface HeaderRightBlockProps {
    extra?: React.ReactNode
}

const HeaderRightBlock: React.FC<HeaderRightBlockProps> = ({extra}) => {
    const classes = useStyles()
    const {data, isSuccess} = useGetMeQuery()
    const {data: departments} = useGetDepartmentsQuery()
    const navigate = useNavigate()

    // Выйти из системы
    const onLogoutHandler = () => {
        Modal.confirm({
            title: "Вы действительно хотите выйти?",
            onOk: () => {
                removeToken()
                navigate("/login")
            }
        })
    }

    const items = [
        {
            label: <>
                ФИО: {data?.data.name} {data?.data.surname}
            </>,
            key: "name",
            disabled: true
        },
        {
            label: <>Кафедра: {departments?.data.find(department => department.id === data?.data.department_id)?.title}</>,
            key: "group_number",
            disabled: true
        },
        {
            label: "Выйти",
            key: "logout",
            icon: <PoweroffOutlined />,
            onClick: onLogoutHandler
        }
    ]

    if (isSuccess && data) {
        return (
            <div className={classes.firstNavBlock}>
                {extra}
                <Dropdown menu={{items}} arrow>
                    <div>
                        <Avatar
                            icon={data.data.profile_picture_url ? <img src={data.data.profile_picture_url} alt="avatar" /> : <UserOutlined />}
                            style={{verticalAlign: "middle", background: "#016f4d"}}
                        />
                        <span style={{marginLeft: "10px"}}>{data.data.name}</span>
                    </div>
                </Dropdown>
            </div>
        )
    }

    return (
        <div className={classes.firstNavBlock}>
            {extra}
        </div>
    )
}

export default HeaderRightBlock
