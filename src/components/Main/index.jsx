import React, {Component} from "react";

import PropTypes from "prop-types"

import Item from "../Item";

import "./index.css"

export default class Main extends Component {
    static propTypes = {
        todos: PropTypes.array.isRequired,
        handleItemStateChanged: PropTypes.func.isRequired,
        handleDeleteItem: PropTypes.func.isRequired
    }

    render() {
        let {todos, handleItemStateChanged, handleDeleteItem} = this.props

        return (
            <ul className="todo-main">
                {
                    todos.map(todo => {
                        return <Item key={todo.id} todo={todo} handleItemStateChanged={handleItemStateChanged}
                                     handleDeleteItem={handleDeleteItem}/>
                    })
                }
            </ul>
        )
    }
}