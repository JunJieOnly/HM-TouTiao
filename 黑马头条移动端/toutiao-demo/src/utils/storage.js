// 封装本地存储方法
// 存储
export const setItem = (key, val) => {
    // 判断类型
    if (typeof val === "object") {
        return localStorage.setItem(key, JSON.stringify(val))
    } else {
        return localStorage.setItem(key, val)
    }
}
// 取出
export const getItem = key => {
    const data = localStorage.getItem(key)
    try {
        // 先解析处理，处理不了报错，走catch，直接返回出去
        return JSON.parse(data)
    } catch (error) {
        return data
    }
}
// 删除
export const removeItem = key => {
    return localStorage.removeItem(key)
}
