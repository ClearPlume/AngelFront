import React, {Component} from 'react';
import {Layout, Input} from 'antd';
import {Switch, Route, Redirect} from 'react-router-dom';

import UserInfo from "./components/user/UserInfo";
import Home from "./pages/Home";
import Navigator from "./components/common/Navigator";
import User from "./pages/User";
import Auth from "./pages/Auth";

import "antd/dist/antd.css"

const {Header, Content, Footer, Sider} = Layout;
const {Search} = Input

class App extends Component {
    render() {
        return (
            <Layout>
                <Sider style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}>
                    <div style={{height: "64px", textAlign: "center"}}>
                        <Search style={{position: "relative", top: "25%", width: "85%"}}/>
                    </div>
                    <Navigator/>
                </Sider>
                <Layout className="site-layout" style={{marginLeft: 200}}>
                    <Header className="site-layout-background" style={{padding: 0, position: "fixed", width: "89.5%"}}>
                        <UserInfo/>
                    </Header>
                    <Content style={{margin: '50px 16px 0', overflow: 'initial'}}>
                        <div className="site-layout-background" style={{padding: 24}}>
                            <Switch>
                                <Route path="/home" component={Home}/>
                                <Route path="/user" component={User}/>
                                <Route path="/auth" component={Auth}/>
                                <Redirect to="/home"/>
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED.</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default App;