import React, {Component} from 'react';

import {Switch, Route, Redirect} from "react-router-dom";

import CustomLinkNav from "../../components/CustomLinkNav";
import News from "./News";
import Message from "./Message";

class Home extends Component {
    componentDidMount() {
        this.newsTimer = setTimeout(() => {
            this.props.history.push("/home/message")
        }, 3000)
    }

    render() {
        return (
            <>
                <h3>我是Home的内容</h3>
                <div>
                    <ul className="nav nav-tabs">
                        <li>
                            <CustomLinkNav to="/home/news">News</CustomLinkNav>
                        </li>
                        <li>
                            <CustomLinkNav to="/home/message">Message</CustomLinkNav>
                        </li>
                    </ul>
                    <Switch>
                        <Route path="/home/news" component={News}/>
                        <Route path="/home/message" component={Message}/>
                        <Redirect to="/home/news"/>
                    </Switch>
                </div>
            </>
        );
    }

    componentWillUnmount() {
        clearTimeout(this.newsTimer)
    }
}

export default Home;