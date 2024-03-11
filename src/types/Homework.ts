import {Student} from "./Student"

export interface ResponseHomework {
    status: boolean
    message: {
        ru: string
        uz: string
    }
    data: HomeworkFile[]
}

export interface HomeworkFile {
    id: string
    file_name: string
    file_path: string
    student_id: string
    group_id: string
    course_id: string
    status: "pending" | "accepted" | "declined"
    mark: number
    student: Student
    created_at: string
    updated_at: string
}