import { createContext, useContext } from "react";

interface Todo {
    id: number;
    todo: string;
    completed: boolean;
}

interface TodoContextType {
    todos: Todo[];
    addTodo: (todo: Todo) => void;
    updatedTodo: (id: number, todo: Todo) => void;
    deleteTodo: (id: number) => void;
    toggleComplete: (id: number) => void;
}

export const TodoContext = createContext<TodoContextType | null>(null);

export const useTodo = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error("useTodo must be used within a TodoProvider");
    }
    return context;
};

export const Todoprovider = TodoContext.Provider;
