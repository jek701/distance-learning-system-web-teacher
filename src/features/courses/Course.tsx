import React from "react"
import {Avatar, List} from "antd"
import {useGetAllCoursesQuery} from "./courseApi"
import LoadingBlock from "../../components/LoadingBlock"
import {useNavigate} from "react-router-dom"

interface CourseProps {

}

const Course: React.FC<CourseProps> = ({}) => {
    const {data, isSuccess, isLoading} = useGetAllCoursesQuery()
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