export interface GroupsResponse {
    status: boolean
    message: {
        ru: string
        uz: string
    }
    data: Group[]
}

export interface GroupResponse {
    status: boolean
    message: {
        ru: string
        uz: string
    }
    data: Group
}

export interface Group {
    id: string
    number: string
    department_id: string
    studying_courses: string[] | null
    created_at: string
    updated_at: string
}