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
    const [count, setCount] = useState(todos.length);

    const handleInputChange = (e) => {
        setInputVal(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTodos((todo) => [...todo, inputVal]);
        setInputVal('');
        setCount(prevCount => prevCount + 1);
    };

    const handleDelete = (todoToDelete) => {
        const newTodos = todos.filter(todo => todo !== todoToDelete);
        setTodos(newTodos);
        setCount(prevCount => prevCount - 1);
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
                {todos.map((todo) => (
                    <li key={todo}>
                        {todo}
                        <button onClick={() => handleDelete(todo)}>Delete!</button>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default FunctionalInput;
