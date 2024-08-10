import React from 'react';
import TodoList from './TodoList';
import Form from './Form';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      todoText: '',
      showCompleted: true,
    };
  }

  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos = () => {
    axios.get(URL)
      .then(response => {
        this.setState({ todos: response.data });
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  };

  handleInputChange = (event) => {
    this.setState({ todoText: event.target.value });
  };

  handleAddTodo = (event) => {
    event.preventDefault();
    const newTodo = { name: this.state.todoText };

    axios.post(URL, newTodo)
      .then(response => {
        this.setState(prevState => ({
          todos: [...prevState.todos, response.data],
          todoText: ''
        }));
      })
      .catch(error => {
        console.error('Error adding todo:', error);
      });
  };

  handleToggleCompleted = (todoId) => {
    axios.patch(`${URL}/${todoId}`)
      .then(response => {
        this.setState(prevState => ({
          todos: prevState.todos.map(todo =>
            todo.id === todoId ? response.data : todo
          )
        }));
      })
      .catch(error => {
        console.error('Error toggling todo:', error);
      });
  };

  handleClearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed)
    }));
  };

  toggleShowCompleted = () => {
    this.setState(prevState => ({
      showCompleted: !prevState.showCompleted
    }));
  };

  render() {
    const filteredTodos = this.state.showCompleted
      ? this.state.todos
      : this.state.todos.filter(todo => !todo.completed);

    return (
      <div>
        <h1>Todo App</h1>
        <Form
          todoText={this.state.todoText}
          handleInputChange={this.handleInputChange}
          handleAddTodo={this.handleAddTodo}
          handleClearCompleted={this.handleClearCompleted}
          toggleShowCompleted={this.toggleShowCompleted}
          showCompleted={this.state.showCompleted}
        />
        <TodoList
          todos={filteredTodos}
          handleToggleCompleted={this.handleToggleCompleted}
        />
      </div>
    );
  }
}
