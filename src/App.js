import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList} from './components/todo';
import {addTodo, generateId, findById, updateTodo, toggleTodo, removeTodo} from './lib/todoHelpers';
import {partial, pipe} from './lib/utils';

class App extends Component {
  state = {
    todos : [
      {id:1, name:'JSX', isComplete:false},
      {id:2, name:'Javascript', isComplete:false},
      {id:3, name:'React', isComplete:false}
    ],
    currentTodo: ''
  }

  handleRemove = (id, e) => {
    e.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id);
    this.setState({todos: updatedTodos})
  }

  handleToggle = (id) => {
    const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos));
    const updatedTodos = getUpdatedTodos(id, this.state.todos);
    this.setState({todos: updatedTodos})

  }
  handleSubmit = (e) => {
    e.preventDefault();
    const newId  = generateId();
    const newTodo = {id: newId, name: this.state.currentTodo, isComplete: false }
    const updatedTodos = addTodo(this.state.todos, newTodo)
    this.setState({todos: updatedTodos, currentTodo: '', errorMessage: ''})
  }

  handleEmptySubmit = (e) => {
    e.preventDefault();
    this.setState({errorMessage: 'Please suply a todo name'})
  }

  handleInputChange = (e) => {
    this.setState({currentTodo: e.target.value})
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className="App-title">React todos</h2>
        </div>
        <div className="Todo-App">
        {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
        <TodoForm handleSubmit={submitHandler}
                  handleInputChange={this.handleInputChange}
                  currentTodo={this.state.currentTodo}/>
        <TodoList todos={this.state.todos} handleToggle={this.handleToggle} handleRemove={this.handleRemove}/>
        </div>
      </div>
    );
  }
}

export default App;
