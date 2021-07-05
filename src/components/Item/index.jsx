import React, {Component} from "react";

import "./index.css"

export default class Item extends Component {
    state = {
        mouseIn: false
    }

    render() {
        let {id, name, done} = this.props.todo
        let {mouseIn} = this.state

        return (
            <li onMouseEnter={this.handleMouseInOut(true)} onMouseLeave={this.handleMouseInOut(false)}
                style={{backgroundColor: mouseIn ? "#ddd" : "#fff"}}>
                <label>
                    <input type="checkbox" checked={done} onChange={this.handleCheck(id)}/>
                    <span>{name}</span>
                </label>
                <button className="btn btn-danger" style={{display: mouseIn ? "block" : "none"}}
                        onClick={() => this.handleDeleteItem(id)}>
                    删除
                </button>
            </li>
        )
    }

    handleCheck = (id) => {
        return event => {
            return this.props.handleItemStateChanged(id, event.target.checked)
        }
    }

    handleMouseInOut = mouseIn => {
        return () => {
            this.setState({mouseIn})
        }
    }

    handleDeleteItem = id => {
        if (window.confirm("确认删除这个todo项吗？")) {
            this.props.handleDeleteItem(id)
        }
    }
}