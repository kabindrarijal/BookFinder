import React, {Component} from 'react';
import Home from "./components/Home";
import Nav from './components/Nav';
import About from './components/About';
import AddBooks from './components/AddBook';
import Signin from './components/Signin';
import Signup from './components/Signup';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class App extends Component {
    render() {
        return (
            <Router>
            <div className="App">
                <Nav />
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/home" exact component={Home}/>
                    <Route path="/about" component={About}/>
                    <Route path="/signin" component={Signin}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/addbooks" component={AddBooks}/>
                </Switch>                            
            </div>
            </Router>
    )
        ;
    }
}



export default App;