import React, {Component} from 'react';
import {ModalForm} from "@ant-design/pro-form";
import {AutoComplete, Button, Cascader, Form, Input, message, Select} from "antd";
import {request} from "../../../util/request";
import PubSub from "pubsub-js";
import {USER_MODIFY_SUCCESS} from "../../../util/constant";

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

const websiteSuffix = ['.com', '.org', '.net', '.top'];

class UserModifier extends Component {
    state = {
        autoCompleteResult: [],
        agreementVisible: false
    }

    render() {
        let {userInfo} = this.props

        return (
            <ModalForm title="修改用户信息" initialValues={userInfo}
                       trigger={<Button type="primary">编辑</Button>}
                       onFinish={async values => {
                           const {id, username, nickname} = values
                           const data = {id, username, nickname, avatar: ""}
                           let modifySuccess = false

                           await request({url: "/user/modify", method: "put", data: JSON.stringify(data)}).then(
                               response => {
                                   const {data} = response

                                   if (data.code === 200) {
                                       message.success(`用户${username}信息修改成功！`).then()
                                       modifySuccess = true
                                       PubSub.publish(USER_MODIFY_SUCCESS)
                                   }
                               },
                               error => {
                                   message.error("连接服务器失败，检查网络连接！").then()
                                   console.log(error)
                               }
                           )

                           return modifySuccess
                       }}>
                <Form.Item hidden noStyle name="id"><Input/></Form.Item>
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
                    <Input/>
                </Form.Item>

                <Form.Item name="nickname" label="昵称" tooltip="你希望别人怎么称呼你？">
                    <Input/>
                </Form.Item>

                <Form.Item name="gender" label="性别">
                    <Select placeholder="选择您的性别">
                        <Select.Option value="male">男</Select.Option>
                        <Select.Option value="female">女</Select.Option>
                        <Select.Option value="other">其它</Select.Option>
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
            </ModalForm>
        );
    }

    phonePrefixSelector = (
        <Form.Item name="prefix" noStyle initialValue="86">
            <Select style={{width: 70, height: 30}}>
                <Select.Option value="86">+86</Select.Option>
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
}

export default UserModifier;