
type FormatPhoneType = (phone: string | undefined) => string

/**
 * Форма телефона
 * @param phone
 */
export const formatPhone: FormatPhoneType = phone => {
    if (phone) {
        // Длина номера
        const length = phone.replace(/[^\d]/g, "").length

        if (length === 12) return phone.replace(/d?(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/, "$1 $2 $3 $4 $5")
        else if (length === 9) return phone.replace(/^d?(\d{2})(\d{3})(\d{2})(\d{2})$/, "$1 $2 $3 $4")
        else if (length === 7) return phone.replace(/^d?(\d{3})(\d{2})(\d{2})$/, "$1 $2 $3")
        return phone
    }
    return ""
}
