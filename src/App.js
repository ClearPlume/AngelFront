import React, {Component} from 'react';

import Search from "./components/Search";
import UserList from "./components/UserList";

class App extends Component {
    render() {
        return (
            <div className="container">
                <Search/>
                <UserList/>
            </div>
        );
    }
}

export default App;