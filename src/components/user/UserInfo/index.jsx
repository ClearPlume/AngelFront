import React, {Component} from 'react';
import {message, Row, Col, Form, Input} from "antd"
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import PubSub from "pubsub-js"

import RequestButton from "../../common/RequestButton";

import {request} from "../../../util/request"
import {setCookie} from "../../../util/cookie"
import {ACCESS_TOKEN_KEY, AUTO_LOGIN_SUCCESS, REFRESH_TOKEN_KEY, LOGIN_SUCCESS, LOGOUT} from "../../../util/constant";
import {confirm} from "../../../util/modal";

class UserInfo extends Component {
    state = {
        initialling: true,
        error: false,
        isLogin: false,
        userInfo: undefined
    }

    componentDidMount() {
        this.getUserInfo()

        PubSub.subscribe(AUTO_LOGIN_SUCCESS, () => this.getUserInfo())
    }

    render() {
        const {initialling, error, isLogin} = this.state

        return (
            <Row justify="end" align="middle" style={{height: "100%"}}>
                {
                    initialling ?
                        <Col span="2"><h4 style={{color: "white"}}>初始化中...</h4></Col> :
                        error ?
                            <Col span="2"><h4 style={{color: "orange"}}>网络错误</h4></Col> :
                            isLogin ?
                                <Col span="3" style={{color: "white"}}>
                                    {this.state.userInfo["nickname"]}
                                    &emsp;
                                    <RequestButton type="danger" htmlType="button" ref={btn => this.logoutBtn = btn}
                                                   onClick={this.logout}>
                                        退出
                                    </RequestButton>
                                </Col> :
                                <Col span="8">
                                    <Form ref={form => this.loginForm = form} name="horizontal_login" layout="inline"
                                          onFinish={this.login}>
                                        <Form.Item name="username"
                                                   rules={[
                                                       {
                                                           required: true,
                                                           message: "请输入用户名！"
                                                       },
                                                       {
                                                           whitespace: true,
                                                           message: "用户名不能为空！"
                                                       },
                                                       {
                                                           pattern: /^\s*[a-zA-Z0-9]*\s*$/,
                                                           message: "用户名不能包含特殊字符."
                                                       }
                                                   ]}>
                                            <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                                                   placeholder="用户名"/>
                                        </Form.Item>
                                        <Form.Item name="password"
                                                   rules={[
                                                       {
                                                           required: true,
                                                           message: "请输入密码！"
                                                       },
                                                       {
                                                           whitespace: true,
                                                           message: "密码不能为空！"
                                                       }
                                                   ]}>
                                            <Input prefix={<LockOutlined className="site-form-item-icon"/>}
                                                   type="password" placeholder="密码"/>
                                        </Form.Item>
                                        <Form.Item>
                                            <RequestButton type="primary" htmlType="submit"
                                                           ref={btn => this.loginBtn = btn}>
                                                登录
                                            </RequestButton>
                                        </Form.Item>
                                    </Form>
                                </Col>
                }
            </Row>
        )
    }

    getUserInfo = () => {
        request({url: "/user/info", method: "get"})
            .then(
                response => {
                    this.setState({initialling: false})
                    const {data} = response

                    if (data.code === 200) {
                        const {data: userInfo} = data
                        this.setState({isLogin: true, userInfo})
                    }
                },
                error => {
                    message.error("获取用户状态失败，检查网络连接！")
                        .then(() => this.setState({initialling: false, error: true}))
                    console.log(error)
                }
            )
    }

    login = values => {
        this.setState({logging: true})

        request({url: "/user/login", method: "post", data: JSON.stringify(values)}, this.loginBtn)
            .then(response => {
                    const {data} = response

                    switch (data.code) {
                        case 200:
                            const tokenData = data.data
                            setCookie(ACCESS_TOKEN_KEY, tokenData["token"])
                            setCookie(REFRESH_TOKEN_KEY, tokenData["refreshToken"])

                            this.getUserInfo()
                            PubSub.publish(LOGIN_SUCCESS)
                            break
                        case 460:
                        case 461:
                            message.error("用户名或密码错误！").then(() => {
                                this.loginForm.resetFields()
                                this.loginForm.getFieldInstance("username").focus()
                            })
                            break
                    }
                },
                error => {
                    message.error("登录失败，检查网络连接！").then()
                    console.log(error)
                })
    }

    logout = () => {
        confirm({
            content: "确定退出登录吗？",
            onOk: () => {
                request({url: "/user/logout", method: "post"}, this.logoutBtn)
                    .then(
                        response => {
                            const {data} = response

                            if (data.code === 200) {
                                this.setState({isLogin: false})
                                PubSub.publish(LOGOUT)
                            }
                        },
                        error => {
                            message.error("连接服务器失败，检查网络连接！")
                                .then(() => this.setState({initialling: false, error: true}))
                            console.log(error)
                        }
                    )
            }
        })
    }
}

export default UserInfo;