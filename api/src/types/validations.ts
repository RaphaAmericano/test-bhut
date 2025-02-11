type ValidationResponse<T> = {
    success: boolean,
    data: T,
    error: unknown
}

export {
    ValidationResponse
}