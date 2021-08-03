/**
 * 新增cookie
 *
 * @param key{string} 新增cookie的key
 * @param value{string|number} 新增cookie的value。如果是number，会自动转成string
 * @param expires{number} 过期时间(天)，默认30天
 */
export const setCookie = (key, value, expires = 30) => {
    const now = new Date()
    now.setTime(now.getTime() + expires * 1000 * 60 * 60 * 24)

    document.cookie = `${key}=${value}; expires=${now.toUTCString()}; Secure`
}

/**
 * 获取cookie值
 *
 * @param key{string} 要获取的cookie的key
 */
export const getCookie = key => {
    return cookies().get(key)
}

/**
 * 获取全部cookie的值
 *
 * @returns {Map<string, string>} 内容为“key=value”的数组
 */
export const cookies = () => {
    const data = new Map()

    document.cookie.split("; ").forEach(cookie => {
        const coo = cookie.split("=");

        if (coo[1] !== undefined) {
            data.set(coo[0], coo[1])
        }
    })
    return data
}

/**
 * 删除指定key的cookie
 *
 * @param key
 */
export const deleteCookie = key => {
    const now = new Date()
    now.setTime(now.getTime() - 1)

    document.cookie = `${key}=; expires=${now.toUTCString()}; Secure`
}

/**
 * 清空全部cookie
 */
export const clearCookie = () => {
    cookies().forEach((_, key) => deleteCookie(key))
}