import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos : [
        {
            // id : 1,
            // todo : "Todo msg",
            // completed : false,
        }
    ],
    addTodo: (todo: { id: number; todo: string; completed: boolean }) => {
        // Implementation here
    },
    updatedTodo:(id: number, todo: { id: number; todo: string; completed: boolean }) => {
        // Implementation here
    },
    deleteTodo : (id:number) =>{},
    toggleComplete : (id:number) => {} 
})

export const useTodo = () =>{
    return useContext(TodoContext)
}

export const Todoprovider = TodoContext.Provider