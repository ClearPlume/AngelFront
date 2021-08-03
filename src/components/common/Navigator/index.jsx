import React, {Component} from 'react';
import {Menu} from "antd";
import {Link, withRouter} from "react-router-dom";

class Navigator extends Component {
    render() {
        const {pathname} = this.props.location;

        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={this.calcSelectedTabByPath} selectedKeys={[pathname]}>
                <Menu.Item key="/home" style={{marginTop: "0"}}>
                    <Link to="/home">主页</Link>
                </Menu.Item>
                <Menu.Item key="/user">
                    <Link to="/user">用户管理</Link>
                </Menu.Item>
                <Menu.Item key="/auth">
                    <Link to="/auth">权限管理</Link>
                </Menu.Item>
                <Menu.Item key="5">
                    nav 5
                </Menu.Item>
                <Menu.Item key="6">
                    nav 6
                </Menu.Item>
                <Menu.Item key="7">
                    nav 7
                </Menu.Item>
                <Menu.Item key="8">
                    nav 8
                </Menu.Item>
            </Menu>
        );
    }

    calcSelectedTabByPath = () => {
        const {pathname: path} = this.props.location;
        return [path]
    }
}

export default withRouter(Navigator);