import React, {Component} from 'react';
import {Popconfirm} from "antd";

class BubbleConfirm extends Component {
    render() {
        return <Popconfirm title="确定继续您的操作吗？" okText="确定" cancelText="取消" {...this.props}/>
    }
}

export default BubbleConfirm;