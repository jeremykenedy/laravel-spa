const required = (value, args, { field }) => {
    if (!value) {
        return `The ${field} field is required.`
    }

    return true
}

const email = (value, args, { field }) => {
    if (!value) {
        return `The ${field} field is required.`
    }

    return true
}

const min = (value, [limit], { field }) => {
    if (!value || !value.length) {
        return true
    }

    if (value.length < limit) {
        return `The ${field} must be at least ${limit} characters.`
    }

    return true
}

export { required, min, email }
