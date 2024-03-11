import React from "react"
import {useGetMeQuery} from "../auth/authApi"
import {useGetCourseByTeacherIdQuery} from "../courses/courseApi"
import {Col, List, Row} from "antd"
import Title from "antd/es/typography/Title"
import {useGetDepartmentQuery} from "../department/departmentApi"

interface MainProps {

}

const Main: React.FC<MainProps> = ({}) => {
    const me = useGetMeQuery()
    const {data} = useGetCourseByTeacherIdQuery(me.data?.data.id || "", {skip: !me.data?.data.id})
    const {data: department} = useGetDepartmentQuery(me.data?.data.department_id || "", {skip: !me.data?.data.department_id})
    return (
        <Row gutter={20} align={"middle"} justify={"center"}>
            <Col style={{textAlign: "center"}} span={24}>
                <Title level={3}>Кафедра: {department?.data.title} ({department?.data.title_short})</Title>
            </Col>
            <Col span={12}>
                <List header={<div style={{textAlign: "center"}}>Список дисциплин</div>}
                      bordered
                      itemLayout="horizontal"
                      dataSource={data?.data}
                      renderItem={(item, index) => (
                          <List.Item>
                              <List.Item.Meta
                                  title={`${index + 1}. ${item.title}`}
                              />
                          </List.Item>
                      )}
                />
            </Col>
        </Row>
    )
}

export default Main