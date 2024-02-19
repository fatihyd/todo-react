/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Count from './Count';

class ClassInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: ['Just some demo tasks', 'As an example'],
            inputVal: '',
            count: 2 // not ideal !!!
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

    handleSubmit(e) {
        e.preventDefault();
        this.setState((state) => ({
            todos: state.todos.concat(state.inputVal),
            inputVal: '',
            count: state.count + 1
        }));
    }

    handleDelete(todoToDelete) {
        const newTodos = this.state.todos.filter(todo => todo !== todoToDelete);
        this.setState((prevState) => {
            return {
                ...prevState,
                todos: newTodos,
                count: prevState.count - 1
            }
        });
    }

    render() {
        return (
            <section>
                {/* eslint-disable-next-line react/prop-types */}
                <h3>{this.props.name}</h3>
                <Count count={this.state.count} />
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
                    {this.state.todos.map((todo) => (
                        <li key={todo}>
                            {todo}
                            <button onClick={() => this.handleDelete(todo)}>Delete!</button>
                        </li>
                    ))}
                </ul>
            </section>
        );
    }
}

export default ClassInput;
