import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

const initialState = [];

const init = () => {
	return JSON.parse(localStorage.getItem("todos")) || [];
};

export const useTodos = () => {
	const [todos, dispatchTodo] = useReducer(todoReducer, initialState, init);

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	const handleNewTodo = (todo) => {
		const action = {
			type: "[TODO] Add Todo",
			payload: todo,
		};

		dispatchTodo(action);

		// console.log({ todo });
	};

	const handleDeleteTodo = (id) => {
		const action = {
			type: "[TODO] Remove Todo",
			payload: id,
		};

		dispatchTodo(action);
	};

	const handleToggleTodo = (id) => {
		const action = {
			type: "[TODO] Toggle Todo",
			payload: id,
		};
		dispatchTodo(action);
	};

	const todosCount = todos.length;
	const pendingTodosCount = todos.filter((todo) => !todo.done).length;

	return {
		todos,
		handleNewTodo,
		handleDeleteTodo,
		handleToggleTodo,
		todosCount,
		pendingTodosCount,
	};
};
