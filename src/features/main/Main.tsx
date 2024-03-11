import React from "react"
import {useGetMeQuery} from "../auth/authApi"
import {useGetAllStudentsByGroupQuery} from "../students/studentsApi"
import LoadingBlock from "../../components/LoadingBlock"
import {Col, List, Row} from "antd"
import {useGetGroupsQuery} from "../group/groupApi"
import {useGetAllCoursesQuery} from "../courses/courseApi"

interface MainProps {

}

const Main: React.FC<MainProps> = ({}) => {
    const me = useGetMeQuery()
    const groupNumber = me.data?.data.group_number || ""
    const {data: students, isLoading, isSuccess} = useGetAllStudentsByGroupQuery(groupNumber, {skip: !groupNumber})
    const {data: groups} = useGetGroupsQuery()
    const {data: courses} = useGetAllCoursesQuery()
    const currentGroup = groups?.data.find(group => group.number === groupNumber)

    if (isLoading) {
        return <LoadingBlock/>
    }

    if (isSuccess && students.data) {
        return (
            <Row gutter={[20, 20]}>
                <Col span={12}>
                    <List
                        itemLayout="horizontal"
                        dataSource={students.data}
                        bordered
                        header={<div style={{textAlign: "center"}}>Список студентов группы: {groupNumber}</div>}
                        renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={`${index + 1}. ${item.surname} ${item.name} ${item.middle_name}`}
                                />
                            </List.Item>
                        )}
                    />
                </Col>
                <Col span={12}>
                    {currentGroup && currentGroup.studying_courses && <List
                        header={<div style={{textAlign: "center"}}>Список дисциплин</div>}
                        bordered
                        itemLayout="horizontal"
                        dataSource={currentGroup.studying_courses}
                        renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={`${index + 1}. ${courses?.data.find(course => course.id === item)?.title || ""}`}
                                />
                            </List.Item>
                        )}
                    />}
                </Col>
            </Row>
        )
    }

    return null
}

export default Main