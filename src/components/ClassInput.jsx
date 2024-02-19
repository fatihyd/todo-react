/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Count from './Count';

class ClassInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: ['Just some demo tasks', 'As an example'],
            inputVal: '',
            editIndex: null
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleInputChange(e) {
        this.setState((state) => ({
            ...state,
            inputVal: e.target.value,
        }));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.editIndex !== null) {
            const updatedTodos = [...this.state.todos];
            updatedTodos[this.state.editIndex] = this.state.inputVal;
            this.setState((prevState) => {
                return {
                    ...prevState,
                    todos: updatedTodos,
                    editIndex: null,
                    inputVal: ''
                }
            });
        } else {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    todos: [...prevState.todos, this.state.inputVal],
                    inputVal: ''
                }
            });
        }
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

    handleEdit = (index, todo) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                editIndex: index,
                inputVal: todo
            }
        });
    }

    render() {
        const count = this.state.todos.length;

        return (
            <section>
                <h3>{name}</h3>
                <Count count={count} />
                {/* The input field to enter To-Do's */}
                <form onSubmit={this.handleSubmit}>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label htmlFor="task-entry">Enter a task: </label>
                    <input
                        type="text"
                        name="task-entry"
                        value={this.state.inputVal}
                        onChange={this.handleInputChange}
                    />
                    <button type="submit">Submit</button>
                </form>
                <h4>All the tasks!</h4>
                {/* The list of all the To-Do's, displayed */}
                <ul>
                    {this.state.todos.map((todo, index) => (
                        <li key={todo}>
                            {
                                this.state.editIndex !== index ?
                                    todo : (
                                        <input
                                            type="text"
                                            name="task-entry"
                                            value={this.state.inputVal}
                                            onChange={this.handleInputChange}
                                        />
                                    )
                            }
                            <button onClick={() => this.handleDelete(todo)}>Delete!</button>
                            {
                                this.state.editIndex === index ? (
                                    <button onClick={this.handleSubmit}>Resubmit</button>
                                ) : (
                                    <button onClick={() => this.handleEdit(index, todo)}>Edit</button>
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
