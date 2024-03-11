export interface CoursesResponse {
    status: boolean
    message: {
        ru: string
        uz: string
    }
    data: Courses[]
}

export interface Courses {
    id: string
    title: string
    title_short: string
    created_at: string
    updated_at: string
}

export interface CourseResponse {
    status: boolean
    message: {
        ru: string
        uz: string
    }
    data: Course
}

export interface Course extends Courses {
    manual_files: ManualFiles[]
}

export interface ManualFiles {
    id: string
    file_name: string
    file_path: string
    course_id: string
    created_at: string
    updated_at: string
}