import React from "react"
import {useParams} from "react-router-dom"
import {useGetCourseQuery} from "./courseApi"
import LoadingBlock from "../../components/LoadingBlock"
import {Button, Card, List, notification, Popconfirm, Tag, Upload, UploadProps} from "antd"
import Title from "antd/es/typography/Title"
import {
    useCreateHomeworkMutation,
    useDeleteHomeworkMutation,
    useGetHomeworksByCourseIdQuery
} from "../homeworks/homeworkApi"
import {createUseStyles} from "react-jss"
import moment from "moment"
import {DeleteOutlined} from "@ant-design/icons"

interface CourseByIdProps {

}

const styles = createUseStyles({
    upload: {
        display: "grid",
        gridTemplateColumns: "1fr 30px"
    }
})

const CourseById: React.FC<CourseByIdProps> = ({}) => {
    const params = useParams()
    const classes = styles()
    const {id} = params
    const courseId = id as string
    const {data, isLoading, isSuccess} = useGetCourseQuery(courseId, {skip: !id})
    const {
        data: homeworkData,
        isSuccess: homeworkSuccess
    } = useGetHomeworksByCourseIdQuery(courseId, {skip: !id})
    const [uploadHomework] = useCreateHomeworkMutation()
    const [deleteHomework] = useDeleteHomeworkMutation()

    const uploadProps: UploadProps = {
        defaultFileList: data?.data.manual_files.map(file => ({
            uid: file.id,
            name: file.file_name,
            status: "done",
            url: file.file_path
        }))
    }


    if (isLoading) {
        return <LoadingBlock/>
    }

    if (isSuccess && data) {
        return (
            <div>
                <Title level={1}>{data.data.title} {data.data.title_short && `(${data.data.title_short})`}</Title>
                {data.data.manual_files && <Card title={"Методички"}>
                    <Upload {...uploadProps} />
                </Card>}
                <br/>
                {homeworkSuccess && homeworkData && <Card bordered extra={
                    <Upload
                        showUploadList={false}
                        customRequest={async ({file}) => {
                            const formData = new FormData()
                            // Filename can be in cyrillic
                            formData.append("file", file)
                            formData.append("course_id", courseId)
                            // @ts-ignore
                            await uploadHomework(formData).unwrap().then((res) => {
                                if (res.status) {
                                    notification.success({
                                        message: res.message.ru
                                    })
                                } else {
                                    notification.error({
                                        message: res.message.ru
                                    })
                                }
                            })
                        }}
                    >
                        <Button>Загрузить</Button>
                    </Upload>
                } title={"Домашние задания"}>
                    <List
                        size={"small"}
                        itemLayout="horizontal"
                        dataSource={homeworkData.data}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={<div className={classes.upload}>
                                        <div>
                                            <p>Имя студента: {item.student.name} {item.student.surname}</p>
                                            <p>Файл: <Button download={item.file_path}>Загрузить</Button></p>
                                            <p>Дата загрузки: {moment(item.created_at).format("DD.MM.YYYY - HH:mm")}</p>
                                            <p>Статус: <Tag color={
                                                item.status === "accepted" ? "green" :
                                                    item.status === "rejected" ? "red" : "yellow"
                                            }>{item.status}</Tag></p>
                                            {item.status === "accepted" && <>
                                                <p>Дата
                                                    проверки: {moment(item.updated_at).format("DD.MM.YYYY - HH:mm")}</p>
                                                <p>Оценка: {item.mark}</p>
                                            </>}
                                        </div>
                                        {item.status !== "accepted" && <div>
                                            <Button>
                                                <Popconfirm title={"Вы уверены?"} onConfirm={() => {
                                                    deleteHomework(item.id).unwrap().then((res) => {
                                                            if (res.status) {
                                                                notification.success({
                                                                    message: res.message.ru
                                                                })
                                                            } else {
                                                                notification.error({
                                                                    message: res.message.ru
                                                                })
                                                            }
                                                        }
                                                    )
                                                }}>
                                                    <DeleteOutlined/>
                                                </Popconfirm>
                                            </Button>
                                        </div>}
                                    </div>}
                                />
                            </List.Item>
                        )}
                    />
                </Card>}
            </div>
        )
    }

    return <div>Not found</div>
}

export default CourseById