import React, { useState } from 'react';
import Count from './Count';

// eslint-disable-next-line react/function-component-definition, react/prop-types
const FunctionalInput = ({ name }) => {
    /*
      We declare two state variables and their setters,
      one to store the To-Do's
      and the other to store the value of the input field
    */
    const [todos, setTodos] = useState(['Just some demo tasks', 'As an example']);
    const [inputVal, setInputVal] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const count = todos.length;

    const handleInputChange = (e) => {
        setInputVal(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editIndex !== null) {
            const updatedTodos = [...todos];
            updatedTodos[editIndex] = inputVal;
            setTodos(updatedTodos);
            setEditIndex(null);
        } else {
            setTodos((todo) => [...todo, inputVal]);
        }
        setInputVal('');
    };

    const handleDelete = (todoToDelete) => {
        const newTodos = todos.filter(todo => todo !== todoToDelete);
        setTodos(newTodos);
    }

    const handleEdit = (index, todo) => {
        setEditIndex(index);
        setInputVal(todo);
    }

    return (
        <section>
            <h3>{name}</h3>
            <Count count={count} />
            {/* The input field to enter To-Do's */}
            <form onSubmit={handleSubmit}>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="task-entry">Enter a task: </label>
                <input
                    type="text"
                    name="task-entry"
                    value={inputVal}
                    onChange={handleInputChange}
                />
                <button type="submit">Submit</button>
            </form>
            <h4>All the tasks!</h4>
            {/* The list of all the To-Do's, displayed */}
            <ul>
                {todos.map((todo, index) => (
                    <li key={todo}>
                        {
                            editIndex !== index ?
                                todo : (
                                    <input
                                        type="text"
                                        name="task-entry"
                                        value={inputVal}
                                        onChange={handleInputChange}
                                    />
                                )
                        }
                        <button onClick={() => handleDelete(todo)}>Delete!</button>
                        {
                            editIndex === index ? (
                                <button onClick={handleSubmit}>Resubmit</button>
                            ) : (
                                <button onClick={() => handleEdit(index, todo)}>Edit</button>
                            )
                        }
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default FunctionalInput;