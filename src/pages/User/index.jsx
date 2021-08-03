import React, {Component} from 'react';
import {Button, Space, message, Typography, Table} from "antd";
import PubSub from "pubsub-js";

import {request} from "../../util/request";
import BubbleConfirm from "../../components/common/BubbleConfirm";
import {
    AUTO_LOGIN_SUCCESS,
    LOGIN_SUCCESS,
    LOGOUT,
    USER_MODIFY_SUCCESS,
    USER_REGISTER_SUCCESS
} from "../../util/constant";
import UserRegister from "../../components/user/UserRegister";
import UserModifier from "../../components/user/UserModifier";

const {Title} = Typography

class User extends Component {
    state = {
        userList: []
    }

    componentDidMount() {
        this.getUserList()
        PubSub.subscribe(AUTO_LOGIN_SUCCESS, () => this.getUserList())
        PubSub.subscribe(USER_REGISTER_SUCCESS, () => this.getUserList())
        PubSub.subscribe(USER_MODIFY_SUCCESS, () => this.getUserList())
        PubSub.subscribe(LOGIN_SUCCESS, () => this.getUserList())
        PubSub.subscribe(LOGOUT, () => this.setState({userList: []}))
    }

    render() {
        return (
            <div style={{height: "745px", position: "relative", top: "30px"}}>
                <Space direction="vertical" style={{width: "50%"}}>
                    <Space align="middle">
                        <Title level={4}>用户列表</Title>
                        <UserRegister/>
                    </Space>
                    <Table dataSource={this.state.userList.map(user => ({...user, key: user.id}))} bordered
                           pagination={{position: ["bottomRight"], pageSize: 9, hideOnSinglePage: true}}
                           columns={[
                               {
                                   title: '用户名',
                                   dataIndex: 'username',
                                   key: 'username'
                               },
                               {
                                   title: '昵称',
                                   dataIndex: 'nickname',
                                   key: 'nickname'
                               },
                               {
                                   title: '操作',
                                   key: 'operation',
                                   align: "center",
                                   width: "23%",
                                   render: user => (
                                       <Space>
                                           <UserModifier userInfo={user}/>
                                           <BubbleConfirm
                                               placement="right"
                                               title={`确定删除用户“${user.username}”吗？`}
                                               onConfirm={this.deleteUser(user.username)}>
                                               <Button type="danger">删除</Button>
                                           </BubbleConfirm>
                                       </Space>
                                   )
                               },
                           ]}/>
                </Space>
            </div>
        );
    }

    getUserList = () => {
        request({url: "/user/list", method: "get"})
            .then(response => {
                const {code, data} = response.data

                if (code === 200) {
                    this.setState({userList: data})
                }
            }, error => {
                message.error("获取用户列表失败，检查网络连接！").then()
                console.log(error)
            })
    }

    deleteUser = username => {
        return () => {
            request({url: `/user/delete/${username}`, method: "delete"})
                .then(response => {
                        const {code} = response.data

                        switch (code) {
                            case 200:
                                message.success(`用户${username}删除成功！`).then()
                                this.getUserList()
                                break
                            case 466:
                                message.error(`不存在名为${username}的用户！`).then()
                                break
                        }
                    },
                    error => {
                        message.error("连接服务器失败，检查网络连接！").then()
                        console.log(error)
                    }
                )
        }
    }
}

export default User;