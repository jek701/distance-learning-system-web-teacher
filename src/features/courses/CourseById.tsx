import React, {useEffect} from "react"
import {useParams} from "react-router-dom"
import {useGetCourseQuery} from "./courseApi"
import LoadingBlock from "../../components/LoadingBlock"
import {Button, Card, Form, Input, List, Modal, notification, Select, Tag, Upload, UploadProps} from "antd"
import Title from "antd/es/typography/Title"
import {
    useGetHomeworksByCourseIdQuery, useUpdateHomeworkMutation
} from "../homeworks/homeworkApi"
import {createUseStyles} from "react-jss"
import moment from "moment"
import {useCreateManualMutation, useDeleteManualMutation} from "../courses/courseApi"

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
    const [form] = Form.useForm()
    const [openModal, setOpenModal] = React.useState(false)
    const [homeworkId, setHomeworkId] = React.useState("")
    const [updateHomework, {isSuccess: isHomeworkUpdated, isError: isHomeworkUpdateError, data: homeworkUpdateData}] = useUpdateHomeworkMutation()
    const {
        data: homeworkData,
        isSuccess: homeworkSuccess
    } = useGetHomeworksByCourseIdQuery(courseId, {skip: !id})
    const [uploadManual] = useCreateManualMutation()
    const [deleteManual] = useDeleteManualMutation()

    const uploadProps: UploadProps = {
        defaultFileList: data?.data.manual_files.map(file => ({
            uid: file.id,
            name: file.file_name,
            status: "done",
            url: file.file_path
        })),
        onRemove: async (file) => {
            await deleteManual(file.uid).unwrap().then((res) => {
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
        }
    }

    const onFinish = (values: {
        mark: number,
        status: "accepted" | "rejected" | "pending"
    }) => {
        updateHomework({
            id: homeworkId,
            mark: values.mark,
            status: values.status
        })
    }

    useEffect(() => {
        if (isHomeworkUpdated) {
            notification.success({
                message: "Успешно",
                description: homeworkUpdateData?.message.ru
            })
            setOpenModal(false)
        }
        if (isHomeworkUpdateError) {
            notification.error({
                message: "Ошибка",
                description: homeworkUpdateData?.message.ru
            })
        }
    }, [isHomeworkUpdated, isHomeworkUpdateError])

    if (isLoading) {
        return <LoadingBlock/>
    }

    if (isSuccess && data) {
        return <>
            <div>
                <Title level={1}>{data.data.title} {data.data.title_short && `(${data.data.title_short})`}</Title>
                {data.data.manual_files && <Card title={"Методички"} extra={
                    <Upload
                        showUploadList={false}
                        customRequest={async ({file}) => {
                            await uploadManual({
                                course_id: courseId,
                                file
                            }).unwrap().then((res) => {
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
                }>
                    <Upload {...uploadProps} />
                </Card>}
                <br/>
                {homeworkSuccess && homeworkData && <Card bordered title={"Домашние задания"}>
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
                                                    item.status === "declined" ? "red" : "yellow"
                                            }>{item.status}</Tag></p>
                                            {item.status === "accepted" && <>
                                                <p>Дата
                                                    проверки: {moment(item.updated_at).format("DD.MM.YYYY - HH:mm")}</p>
                                                <p>Оценка: {item.mark}</p>
                                            </>}
                                            <br/>
                                            <Button onClick={() => {
                                                setOpenModal(true)
                                                setHomeworkId(item.id)
                                                form.setFieldsValue({
                                                    mark: item.mark || 0,
                                                    status: item.status
                                                })
                                            }} type={"dashed"} block>
                                                Оценить
                                            </Button>
                                        </div>
                                    </div>}
                                />
                            </List.Item>
                        )}
                    />
                </Card>}
            </div>
            <Modal
                title={"Оценка"}
                open={openModal}
                onCancel={() => setOpenModal(false)}
                okButtonProps={{
                    form: "homework-form",
                    htmlType: "submit"
                }}
            >
                <Form
                    id={"homework-form"}
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label={"Оценка"}
                        name={"mark"}
                    >
                        <Input type={"number"} min={0} max={10}/>
                    </Form.Item>
                    <Form.Item
                        label={"Статус"}
                        name={"status"}
                    >
                        <Select>
                            <Select.Option value={"accepted"}>Принято</Select.Option>
                            <Select.Option value={"declined"}>Отклонено</Select.Option>
                            <Select.Option value={"uploaded"}>На проверке</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    }

    return <div>Not found</div>
}

export default CourseById