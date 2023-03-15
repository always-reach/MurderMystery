export const dateToString = (date: Date | null): string => {
    if (!date) return ""
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}

export const dateFormatForGraphQL = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}