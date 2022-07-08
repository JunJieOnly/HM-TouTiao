export const setItem = (key, val) => {
    if (typeof val === "object") {
        return localStorage.setItem(key, JSON.stringify(val))
    } else {
        return localStorage.setItem(key, val)
    }
}

export const getItem = key => {
    const data = localStorage.getItem(key)
    try {
        return JSON.parse(data)
    } catch (error) {
        return data
    }
}

export const removeItem = key => {
    return localStorage.removeItem(key)
}