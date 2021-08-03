import React, {Component} from 'react';
import {AutoComplete, Button, Cascader, Checkbox, Form, Input, message, Select} from "antd";
import {UserAddOutlined} from "@ant-design/icons";
import PubSub from "pubsub-js";

import {request} from "../../../util/request";
import {ModalForm} from "@ant-design/pro-form";
import {info} from "../../../util/modal";
import {USER_REGISTER_SUCCESS} from "../../../util/constant";

const {Option} = Select
const residences = [
    {
        value: 'zhejiang',
        label: '浙江',
        children: [
            {
                value: 'hangzhou',
                label: '杭州',
                children: [
                    {
                        value: 'xihu',
                        label: '西湖'
                    }
                ]
            }
        ]
    },
    {
        value: 'jiangsu',
        label: '江苏',
        children: [
            {
                value: 'nanjing',
                label: '南京',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: '中华门'
                    }
                ]
            }
        ]
    }
];

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 16,
            offset: 8
        }
    },
};

const websiteSuffix = ['.com', '.org', '.net', '.top'];

class Register extends Component {
    state = {
        autoCompleteResult: [],
        agreementVisible: false
    }

    render() {
        return (
            <ModalForm title="注册新用户" formRef={form => this.registerForm = form}
                       onVisibleChange={() => this.registerForm.resetFields()}
                       trigger={<Button type="primary" icon={<UserAddOutlined/>} ghost>注册</Button>}
                       onFinish={async values => {
                           const {username, password, nickname} = values
                           const data = {username, password, nickname, avatar: ""}
                           let registerSuccess = false

                           await request({
                               url: "/user/register",
                               method: "post",
                               data: JSON.stringify(data)
                           }).then(
                               response => {
                                   const {data} = response

                                   switch (data.code) {
                                       case 200:
                                           const {data: userInfo} = data
                                           message.success(`用户${userInfo.username}注册成功！`).then()
                                           registerSuccess = true
                                           PubSub.publish(USER_REGISTER_SUCCESS)
                                           break
                                       case 465:
                                           const {input: username} = this.usernameInput
                                           username.focus()
                                           username.selectionStart = 0
                                           username.selectionEnd = username.value.length
                                           message.error(`注册失败，已存在名为${username.value}的用户！`).then()
                                           break
                                   }
                               },
                               error => {
                                   message.error("连接服务器失败，检查网络连接！").then()
                                   console.log(error)
                               }
                           )

                           return registerSuccess
                       }}>
                <Form.Item
                    name="username"
                    label="用户名"
                    tooltip="你的登录名"
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
                    <Input ref={input => this.usernameInput = input}/>
                </Form.Item>

                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                        {
                            required: true,
                            message: "请输入密码！"
                        },
                        {
                            whitespace: true,
                            message: "密码不能为空！"
                        }
                    ]}
                    hasFeedback>
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="确认密码"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '请再次输入密码！'
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('两次密码不匹配！'));
                            },
                        }),
                    ]}>
                    <Input.Password/>
                </Form.Item>

                <Form.Item name="nickname" label="昵称" tooltip="你希望别人怎么称呼你？">
                    <Input/>
                </Form.Item>

                <Form.Item name="gender" label="性别">
                    <Select placeholder="选择您的性别">
                        <Option value="male">男</Option>
                        <Option value="female">女</Option>
                        <Option value="other">其它</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="phone" label="手机号">
                    <Input addonBefore={this.phonePrefixSelector} style={{width: '100%'}}/>
                </Form.Item>

                <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[
                        {
                            type: 'email',
                            message: '邮箱格式不正确！',
                        }
                    ]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="residence"
                    label="常住地">
                    <Cascader options={residences}/>
                </Form.Item>

                <Form.Item name="website" label="个人站点">
                    <AutoComplete options={this.websiteOptions()} onChange={this.onWebsiteChange}>
                        <Input/>
                    </AutoComplete>
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('应接受协议')),
                        },
                    ]}
                    {...tailFormItemLayout}>
                    <Checkbox>
                        我已经阅读了<Button type="link" style={{padding: 0}}
                                      onClick={this.showAgreement}>协议</Button>
                    </Checkbox>
                </Form.Item>
            </ModalForm>
        );
    }

    phonePrefixSelector = (
        <Form.Item name="prefix" noStyle initialValue="86">
            <Select style={{width: 70, height: 30}}>
                <Option value="86">+86</Option>
            </Select>
        </Form.Item>
    );

    onWebsiteChange = (value) => {
        if (!value) {
            this.setState({autoCompleteResult: []})
        } else {
            this.setState({autoCompleteResult: websiteSuffix.map(domain => `${value}${domain}`)})
        }
    };

    websiteOptions = () => {
        return this.state.autoCompleteResult.map(website => ({
            label: website,
            value: website,
        }));
    }

    showAgreement = () => {
        info({
            title: '协议',
            content: (
                <div>
                    <p>这是协议...</p>
                    <p>Bla bla ...</p>
                    <p>Bla bla ...</p>
                    <p>Bla bla ...</p>
                    <p>这是协议...</p>
                </div>
            ),
            okText: "读完了"
        });
    }
}

export default Register;