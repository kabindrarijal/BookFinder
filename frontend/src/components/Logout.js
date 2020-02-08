import React, {Component} from 'react';

class Logout extends Component {
    state = {
        Logged: false,
        username: null
    };

    render() {
        return (sessionStorage.setItem('username', 'null'));



    }
}

export default Logout;