export interface TeachersResponse {
    status: boolean
    message: {
        ru: string
        uz: string
    }
    data: Teacher[]
}

export interface TeacherResponse {
    status: boolean
    message: {
        ru: string
        uz: string
    }
    data: Teacher
}

export interface Teacher {
    id: string
    name: string
    surname: string
    middle_name: string
    profile_picture_url: string
    teaching_courses: string[] | null
    department_id: string
    username: string
    created_at: string
    updated_at: string
}