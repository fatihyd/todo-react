/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Count from './Count';

class ClassInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: ['Just some demo tasks', 'As an example'],
            inputVal: '',
            editingTodo: null,
            editVal: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResubmit = this.handleResubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState((prevState) => {
            return {
                ...prevState,
                todos: [...prevState.todos, this.state.inputVal],
                inputVal: ''
            }
        });
    };

    handleResubmit = (todo) => {
        const updatedTodos = [...this.state.todos];
        updatedTodos[this.state.todos.indexOf(todo)] = this.state.editVal;
        this.setState((prevState) => {
            return {
                ...prevState,
                todos: updatedTodos,
                editingTodo: null,
                editVal: ''
            }
        });
    };

    handleDelete(todoToDelete) {
        const newTodos = this.state.todos.filter(todo => todo !== todoToDelete);
        this.setState((prevState) => {
            return {
                ...prevState,
                todos: newTodos,
            }
        });
    }

    handleEdit = (todo) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                editingTodo: todo,
                editVal: todo
            }
        });
    }

    render() {
        const count = this.state.todos.length;

        return (
            <section>
                <h3>{this.props.name}</h3>
                <Count count={count} />
                {/* The input field to enter To-Do's */}
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="task-entry">Enter a task: </label>
                    <input
                        type="text"
                        name="task-entry"
                        value={this.state.inputVal}
                        onChange={
                            (e) => this.setState((prevState) => ({
                                ...prevState,
                                inputVal: e.target.value
                            }))
                        }
                    />
                    <button type="submit">Submit</button>
                </form>
                <h4>All the tasks!</h4>
                {/* The list of all the To-Do's, displayed */}
                <ul>
                    {this.state.todos.map((todo) => (
                        <li key={todo}>
                            {
                                this.state.editingTodo !== todo ?
                                    todo : (
                                        <input
                                            type="text"
                                            name="task-edit"
                                            value={this.state.editVal}
                                            onChange={
                                                (e) => this.setState((prevState) => ({
                                                    ...prevState,
                                                    editVal: e.target.value
                                                }))
                                            }
                                        />
                                    )
                            }
                            <button onClick={() => this.handleDelete(todo)}>Delete!</button>
                            {
                                this.state.editingTodo === todo ? (
                                    <button
                                        onClick={() => { this.handleResubmit(todo) }}>Resubmit</button>
                                ) : (
                                    <button onClick={() => this.handleEdit(todo)}>Edit</button>
                                )
                            }
                        </li>
                    ))}
                </ul>
            </section>
        );
    }
}

export default ClassInput;
