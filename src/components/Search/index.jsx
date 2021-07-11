import React, {Component} from 'react';

import PubSub from "pubsub-js"
import axios from "axios";

import "./index.css"

class Search extends Component {
    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">Search Github Users</h3>
                <div>
                    <input type="text" placeholder="enter the name you search"
                           ref={i => this.searchKeyInput = i}/>
                    &emsp;
                    <button onClick={this.getUserList}>Search</button>
                </div>
            </section>
        );
    }

    getUserList = () => {
        let searchKey = this.searchKeyInput.value;

        if (searchKey.trim().length > 0) {
            if (/[a-zA-Z0-9]+/.test(searchKey)) {
                PubSub.publish("angel", {isFirst: false, isLoading: true, errorMsg: undefined})

                axios.get(`/github/search/users?q=${searchKey}`)
                    .then(
                        response => PubSub.publish("angel", {
                            isFirst: false,
                            isLoading: false,
                            users: response.data.items
                        }),
                        error => PubSub.publish("angel", {isFirst: false, isLoading: false, errorMsg: error.message})
                    )
            } else {
                alert("请输入数字或大小写字母！")
                this.searchKeyInput.value = ""
                this.searchKeyInput.focus()
            }
        } else {
            alert("请输入搜索关键字！")
            this.searchKeyInput.value = ""
            this.searchKeyInput.focus()
        }
    }
}

export default Search;