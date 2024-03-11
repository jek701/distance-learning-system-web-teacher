export interface DepartmentsResponse {
    status: boolean
    message: {
        ru: string
        uz: string
    }
    data: Department[]
}

export interface DepartmentResponse {
    status: boolean
    message: {
        ru: string
        uz: string
    }
    data: Department
}

export interface Department {
    id: string
    title: string
    title_short: string
    created_at: string
    updated_at: string
}