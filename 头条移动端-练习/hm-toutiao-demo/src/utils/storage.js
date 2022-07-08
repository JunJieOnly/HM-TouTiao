export const setItem = (key, val) => {
    if (typeof val === "object") {
        return localStorage.setItem(key, JSON.stringify(val))
    } else {
        return localStorage.setItem(key, val)
    }
}

export const getItem = key => {
    try {
        return localStorage.getItem(JSON.parse(key))
    } catch (error) {
        return localStorage.getItem(key)
    }
}

export const removeItem = key => {
    return localStorage.removeItem(key)
}