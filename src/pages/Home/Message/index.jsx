import React, {Component} from 'react';

import {Link, Route} from "react-router-dom";
import {Button} from "antd";

import Detail from "./Detail";

class Message extends Component {
    state = {
        messages: [
            {id: "msg001", title: "message001"},
            {id: "msg002", title: "message002"},
            {id: "msg003", title: "message003"}
        ]
    }

    render() {
        let {messages} = this.state

        return (
            <>
                <ul style={{marginTop: "10px"}}>
                    {
                        messages.map(message => {
                            return (
                                <li key={message.id} style={{margin: "5px 0"}}>
                                    <Link to={`/home/message/detail/${message.id}/${message.title}`}>
                                        {message.title}
                                    </Link>
                                    &emsp;
                                    <Button onClick={this.showNoHistory(message.id, message.title)}>无痕查看</Button>
                                </li>
                            )
                        })
                    }
                </ul>
                <Route path="/home/message/detail/:id/:title" component={Detail}/>
            </>
        );
    }

    showNoHistory = (id, title) => {
        return () => {
            this.props.history.replace(`/home/message/detail/${id}/${title}`)
        }
    }

    show = (id, title) => {
        this.props.history.push(`/home/message/detail/${id}/${title}`)
    }
}

export default Message;