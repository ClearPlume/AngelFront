import React, {Component} from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

import "./App.css"

export default class App extends Component {
    // noinspection SpellCheckingInspection
    state = {
        todos: [
            {id: "63AxKk-fjm0KtyvGPLPpf", name: "吃饭", done: true},
            {id: "-cQFg9TOPJH5KQlQTuWC0", name: "睡觉", done: false},
            {id: "YzrEsxo1U4cN07NeIccFn", name: "学习", done: true}
        ]
    }

    render() {
        let todos = this.state.todos

        let todoCount = todos.length
        let finishedCount = todos.reduce((count, todo) => count + (todo.done ? 1 : 0), 0)

        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header handleAddTodo={this.handleAddTodo}/>
                    <Main todos={todos} handleItemStateChanged={this.handleItemStateChanged}
                          handleDeleteItem={this.handleDeleteItem}/>
                    <Footer todoCount={todoCount} finishedCount={finishedCount}
                            handleDeleteFinishedItem={this.handleDeleteFinishedItem}
                            handleSelectAll={this.handleSelectAll}/>
                </div>
            </div>
        )
    }

    handleAddTodo = todo => {
        let todos = [todo, ...this.state.todos];
        this.setState({todos})
    }

    handleItemStateChanged = (id, done) => {
        let todos = this.state.todos;

        todos = todos.map(todo => {
            if (todo.id === id) {
                return {...todo, done}
            } else {
                return todo
            }
        })

        this.setState({todos})
    }

    handleDeleteItem = id => {
        let todos = this.state.todos;
        todos = todos.filter(todo => todo.id !== id)
        this.setState({todos})
    }

    handleSelectAll = select => {
        let todos = this.state.todos;
        todos = todos.map(todo => {
            return {...todo, done: select}
        })
        this.setState({todos})
    }

    handleDeleteFinishedItem = () => {
        if (window.confirm("是否清除所有已完成任务？")) {
            let todos = this.state.todos;
            todos = todos.filter(todo => !todo.done)
            this.setState({todos})
        }
    }
}