import React, {Component} from "react";

import PropTypes from "prop-types"

import "./index.css"

export default class Footer extends Component {
    static propTypes = {
        todoCount: PropTypes.number.isRequired,
        finishedCount: PropTypes.number.isRequired,
        handleDeleteFinishedItem: PropTypes.func.isRequired
    }

    render() {
        let {todoCount, finishedCount, handleDeleteFinishedItem} = this.props

        return (
            <div className="todo-footer">
                <label>
                    <input type="checkbox" checked={todoCount === finishedCount && todoCount !== 0}
                           onChange={this.selectAll}/>
                    <span>已完成 {finishedCount} / 全部 {todoCount}</span>
                </label>
                <button className="btn btn-danger" onClick={handleDeleteFinishedItem}>清除已完成任务</button>
            </div>
        )
    }

    selectAll = event => {
        let {handleSelectAll} = this.props
        handleSelectAll(event.target.checked)
    }
}