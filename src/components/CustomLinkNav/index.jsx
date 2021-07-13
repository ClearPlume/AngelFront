import React, {Component} from 'react';

import {NavLink} from "react-router-dom";

import "./index.css"

class CustomLinkNav extends Component {
    render() {
        return (
            <NavLink activeClassName="currLink" className="list-group-item" {...this.props}/>
        );
    }
}

export default CustomLinkNav;