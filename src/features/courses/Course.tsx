import React from "react"
import {Avatar, List} from "antd"
import {useGetCourseByTeacherIdQuery} from "./courseApi"
import LoadingBlock from "../../components/LoadingBlock"
import {useNavigate} from "react-router-dom"
import {useGetMeQuery} from "../auth/authApi"

interface CourseProps {
}

const Course: React.FC<CourseProps> = ({}) => {
    const {data: me} = useGetMeQuery()
    const {data, isSuccess, isLoading} = useGetCourseByTeacherIdQuery(me?.data.id, {skip: !me?.data.id})
    const navigate = useNavigate()

    const onCourseClick = (id: string) => {
        navigate(`/courses/${id}`)
    }

    if (isLoading) {
        return <LoadingBlock/>
    }

    if (data && isSuccess) {
        return <List
            bordered
            itemLayout="horizontal"
            dataSource={data.data}
            header={<div>Курсы</div>}
            renderItem={item => (
                <List.Item onClick={() => onCourseClick(item.id)}>
                    <List.Item.Meta
                        avatar={<Avatar src={item.title[0]}/>}
                        title={item.title}
                    />
                </List.Item>
            )}
        />
    }

    return null
}

export default Course