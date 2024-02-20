import React, { useState } from 'react';
import Count from './Count';

const FunctionalInput = ({ name }) => {
    /*
      We declare two state variables and their setters,
      one to store the To-Do's
      and the other to store the value of the input field
    */
    const [todos, setTodos] = useState(['Just some demo tasks', 'As an example']);
    const [inputVal, setInputVal] = useState('');
    const [editingTodo, setEditingTodo] = useState(null);
    const [editVal, setEditVal] = useState('');
    const count = todos.length;

    const handleSubmit = (e) => {
        e.preventDefault();
        setTodos((todo) => [...todo, inputVal]);
        setInputVal('');
    };

    const handleResubmit = (todo) => {
        const updatedTodos = [...todos];
        updatedTodos[todos.indexOf(todo)] = editVal;
        setTodos(updatedTodos);
        setEditingTodo(null);
        setEditVal('');
    };

    const handleDelete = (todoToDelete) => {
        const newTodos = todos.filter(todo => todo !== todoToDelete);
        setTodos(newTodos);
    }

    const handleEdit = (todo) => {
        setEditingTodo(todo);
        setEditVal(todo);
    }

    return (
        <section>
            <h3>{name}</h3>
            <Count count={count} />
            {/* The input field to enter To-Do's */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="task-entry">Enter a task: </label>
                <input
                    type="text"
                    name="task-entry"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            <h4>All the tasks!</h4>
            {/* The list of all the To-Do's, displayed */}
            <ul>
                {todos.map((todo) => (
                    <li key={todo}>
                        {
                            editingTodo !== todo ?
                                todo : (
                                    <input
                                        type="text"
                                        name="task-edit"
                                        value={editVal}
                                        onChange={(e) => setEditVal(e.target.value)}
                                    />
                                )
                        }
                        <button onClick={() => handleDelete(todo)}>Delete!</button>
                        {
                            editingTodo === todo ? (
                                <button
                                    onClick={() => { handleResubmit(todo) }}>Resubmit</button>
                            ) : (
                                <button onClick={() => handleEdit(todo)}>Edit</button>
                            )
                        }
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default FunctionalInput;