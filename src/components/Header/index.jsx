import React, {Component} from "react";

import {nanoid} from "nanoid";
import PropTypes from "prop-types"

import "./index.css"

export default class Header extends Component {
    static propTypes = {
        handleAddTodo: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="todo-header">
                <input type="text" placeholder="请输入新的任务名称，按回车键确认" onKeyDown={this.handleKeyDown()}/>
            </div>
        )
    }

    handleKeyDown = () => {
        return event => {
            let input = event.target;
            let value = input.value.trim();

            if (event.key === "Enter" && value !== "") {
                this.props.handleAddTodo({id: nanoid(), name: value, done: false})
                input.value = ""
            }
        }
    }
}