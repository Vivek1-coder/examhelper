import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [] as { id: number; todo: string; completed: boolean }[],
    addTodo: (_todo: { id: number; todo: string; completed: boolean }) => {},
    updatedTodo: (_id: number, _todo: { id: number; todo: string; completed: boolean }) => {},
    deleteTodo: (_id: number) => {},
    toggleComplete: (_id: number) => {}
});

export const useTodo = () => {
    return useContext(TodoContext);
};

export const Todoprovider = TodoContext.Provider;
