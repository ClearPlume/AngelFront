import React, {Component} from 'react';

import CustomLinkNav from "./components/CustomLinkNav";
import {Route, Switch, Redirect} from "react-router-dom"

import Header from "./pages/Header";
import About from "./pages/About";
import Home from "./pages/Home";

class App extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-offset-2 col-xs-8">
                        <Header/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">
                            <CustomLinkNav to="/about">About</CustomLinkNav>
                            <CustomLinkNav to="/home">Home</CustomLinkNav>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                <Switch>
                                    <Route path="/about" component={About}/>
                                    <Route path="/home" component={Home}/>
                                    <Redirect to="/about"/>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;