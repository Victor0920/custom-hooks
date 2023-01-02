import { useEffect, useReducer } from 'react';
import { todoReducer } from '../08-useReducer/todoReducer';

export const useTodo = () => {
    const initialState = [];

    const init = () => {
        console.log(JSON.parse(localStorage.getItem('todos')));
        return JSON.parse(localStorage.getItem('todos') || []);
    };

    const [todos, dispatch] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleNewTodo = (id) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: id,
        };

        dispatch(action);
    };

    const handleDelete = (id) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id,
        });
    };

    const handleToggleTodo = (id) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id,
        });
    };

    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter((todo) => !todo.done).length,
        handleNewTodo,
        handleDelete,
        handleToggleTodo,
    };
};
