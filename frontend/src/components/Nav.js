import React, {Component} from 'react';
import {Link} from "react-router-dom";
import '../App.css';

class Nav extends Component {
  state = {
    Logged: false,
    username: null,
  };
  logout = () => {
    sessionStorage.clear()
    document.location='/';
  }

  render() {
    if (sessionStorage.getItem('token')) {
      this.state.Logged = true;
      this.state.username = sessionStorage.getItem('username');
      return (
          <div>
            <nav>
              <ul className="nav-Links">
                <Link to="/">
                  <li>Home</li>
                </Link>
                <Link to="/about">
                  <li>About</li>
                </Link>
                <div>{this.state.username} </div>
                <Link onClick={this.logout} ><div>Logout</div></Link>
              </ul>

            </nav>
          </div>);
    }
    else {
      return (
          <div>
            <nav>
              <ul className="nav-Links">
                <Link to="/">
                  <li>Home</li>
                </Link>
                <Link to="/about">
                  <li>About</li>
                </Link>
                <Link to="/signin">
                  <li>Sign In</li>
                </Link>
                <Link to="/signup">
                  <li>Sign Up</li>
                </Link>

              </ul>
            </nav>
          </div>);

    }


  }
}

export default Nav;