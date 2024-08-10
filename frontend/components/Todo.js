import React from 'react';

export default class Todo extends React.Component {
  render() {
    const { todo, handleToggleCompleted } = this.props;
    return (
      <div
        onClick={() => handleToggleCompleted(todo.id)}
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      >
        {todo.name}
      </div>
    );
  }
}
