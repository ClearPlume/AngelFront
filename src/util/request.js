import axios from "axios";
import {message} from "antd";
import PubSub from "pubsub-js";

import {getCookie, setCookie} from "./cookie";
import {ACCESS_TOKEN_KEY, AUTO_LOGIN_SUCCESS, REFRESH_TOKEN_KEY} from "./constant"

export const request = (config, btn) => {
    const instance = axios.create({
        baseURL: "https://www.fallenangel.top:1024",
        timeout: 3000,
        headers: {
            "Content-Type": "application/json"
        }
    })

    instance.interceptors.request.use(request => {
        btn?.loading(true)
        const token = getCookie(ACCESS_TOKEN_KEY);

        if (token !== undefined) {
            request.headers.Authorization = token
        }

        return request
    })

    instance.interceptors.response.use(response => {
        setTimeout(() => {
            btn?.loading(false)
        }, 500)
        const {data} = response

        switch (data.code) {
            case 462:
                request({
                    url: "/token/refresh",
                    method: "post",
                    data: JSON.stringify({refreshToken: getCookie(REFRESH_TOKEN_KEY)})
                }).then(response => {
                    const {data} = response

                    switch (data.code) {
                        case 200:
                            const {token, refreshToken} = data.data
                            setCookie(ACCESS_TOKEN_KEY, token)
                            setCookie(REFRESH_TOKEN_KEY, refreshToken)

                            PubSub.publish(AUTO_LOGIN_SUCCESS)
                            message.success("登录失效，已自动重新登录").then()
                            break
                        case 463:
                        case 464:
                            message.error("登录失效，重新登录").then()
                            break
                    }
                }, error => {
                    message.error("服务器内部错误").then()
                    console.log(error)
                })
                break
        }

        return response
    })

    return instance(config)
}