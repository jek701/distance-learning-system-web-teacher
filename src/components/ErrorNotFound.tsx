import React, {useCallback} from "react"
import {Button, Result} from "antd"
import {useNavigate} from "react-router-dom"

const ErrorNotFound = () => {
    const navigate = useNavigate()
    const onClickHandler = useCallback(() => navigate("/"), [])

    return (
        <Result
            status="404"
            title="404"
            subTitle="Извините, страница, которую вы посетили, не существует."
            extra={
                <Button type="primary" onClick={onClickHandler}>
                    Назад на главную
                </Button>
            }
        />
    )
}

export default ErrorNotFound
