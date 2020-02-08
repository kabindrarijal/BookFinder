// frontend/src/App.js

import React, { Component } from "react";
import Modal from "./Modal";
import axios from "axios";
import '../App.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      todoList: []
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    axios
      .get("http://localhost:8000/api/todos/")
      .then(res => this.setState({ todoList: res.data }))
      .catch(err => console.log(err));

  };
  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };
  renderTabList = () => {
    return (
      <div className="my-5 tab-list">

        <h2>Old Books available</h2>
      </div>
    );
  };
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      item => item.completed === viewCompleted
    );
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <div className="book">
          <img alt="No Preview" />
          <div className="bookDetails">
            {/* <p className="authors">by {this.formatAuthors(this.props.authors)}</p> */}
            <p><b>Category:</b> {item.title}</p>
            <p><b>Description:</b> {item.description}</p>
            <p><b>Price:</b>300</p>
            <button 
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            {" "}
            Buy{" "}
          </button>
          </div>
        </div>
      </li>
    ));
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/todos/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/api/todos/", item)
      .then(res => this.refreshList());
  };
  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/api/todos/${item.id}`)
      .then(res => this.refreshList());
  };
  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  render() {
    return (
      <main className="content">
        {/* <h1 className="text-white text-uppercase text-center my-4">Book Finder</h1> */}
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">

              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default Home;
