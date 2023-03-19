export const dateToString = (date: Date | null): string => {
    if (!date) return ""
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}

export const isValidDate = (dateString: string): boolean => {
    const timestamp = Date.parse(dateString);
    return !isNaN(timestamp);
}