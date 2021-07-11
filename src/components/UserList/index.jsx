import React, {Component} from 'react';

import PubSub from "pubsub-js"

import "./index.css"

class UserList extends Component {
    state = {
        isFirst: true,
        isLoading: false,
        users: [],
        errorMsg: ""
    }

    componentDidMount() {
        this.subToken = PubSub.subscribe("angel", (_, state) => {
            this.setState(state)
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.subToken)
    }

    render() {
        let {isFirst, isLoading, users, errorMsg} = this.state

        return (
            <div className="row">
                {
                    isFirst ? <h2>欢迎</h2> :
                        errorMsg ? <h3 style={{color: "red"}}>{errorMsg}</h3> :
                            isLoading ? <h3>Loading...</h3> :
                                users.map(user => {
                                    return (
                                        <div key={user.id} className="card">
                                            <a href={user.html_url} target="_blank">
                                                <img alt="avatar" src={user.avatar_url}/>
                                            </a>
                                            <p className="card-text">{user.login}</p>
                                        </div>
                                    )
                                })
                }
            </div>
        );
    }
}

export default UserList;