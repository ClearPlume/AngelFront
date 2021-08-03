import React, {Component} from 'react';
import {Button} from "antd";

class RequestButton extends Component {
    state = {
        loading: false
    }

    render() {
        return (
            <Button {...this.props} loading={this.state.loading}/>
        );
    }

    loading = loading => {
        this.setState({loading})
    }
}

export default RequestButton;