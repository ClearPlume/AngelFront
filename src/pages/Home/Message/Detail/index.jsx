import React, {Component} from 'react';

class Detail extends Component {
    state = {
        messages: [
            {id: "msg001", content: "你好，中国"},
            {id: "msg002", content: "你好，未来"},
            {id: "msg003", content: "你好，未来的自己"}
        ]
    }

    render() {
        let {id, title} = this.props.match.params
        let {messages} = this.state
        let shownMsg = messages.find(message => message.id === id);

        return (
            <>
                <hr style={{margin: "10px 0"}}/>
                <ul>
                    <li>ID: {id}</li>
                    <li>TITLE: {title}</li>
                    <li>CONTENT: {shownMsg.content}</li>
                </ul>
            </>
        );
    }
}

export default Detail;