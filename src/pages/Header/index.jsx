import React, {Component} from 'react';
import {withRouter} from "react-router-dom"

import {Button} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons"
import "antd/dist/antd.css"

class Header extends Component {
    render() {
        return (
            <div className="page-header">
                <h2>React Router Demo</h2>
                <div>
                    <Button type="primary" icon={<LeftOutlined/>} shape="round" onClick={this.back}> 后退 </Button>
                    &emsp;
                    <Button type="primary" onClick={this.go} shape="round">
                        前进
                        <RightOutlined/>
                    </Button>
                </div>
            </div>
        );
    }

    go = () => {
        this.props.history.goForward()
    }

    back = () => {
        this.props.history.goBack()
    }
}

export default withRouter(Header);