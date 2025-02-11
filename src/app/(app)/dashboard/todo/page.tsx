"use client";
import TodoForm from "@/components/TodoHelper/TodoForm";
import TodoItem from "@/components/TodoHelper/TodoItem";
import Navbar from "@/components/Navbar/Navbar2";
import { Todoprovider } from "@/context/Todocontext";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Page = () => {
  const [todos, setTodos] = useState<{ id: number; todo: string; completed: boolean }[]>([]);

  const addTodo = (todo: { id: number; todo: string; completed: boolean }) => {
    setTodos((prev) => [{ ...todo, id: Date.now() }, ...prev]);
  };

  const updatedTodo = (id: number, todo: { id: number; todo: string; completed: boolean }) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)));
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
    );
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Handle drag-and-drop
  const handleDragEnd = (result: any) => {
    if (!result.destination) return; // If dropped outside, do nothing

    const newTodos = [...todos];
    const [reorderedTodo] = newTodos.splice(result.source.index, 1);
    newTodos.splice(result.destination.index, 0, reorderedTodo);
    setTodos(newTodos);
  };

  return (
    <section className="h-screen relative">
      <div className="absolute top-0 w-full">
        <Navbar />
      </div>
      <Todoprovider value={{ todos, addTodo, updatedTodo, deleteTodo, toggleComplete }}>
        <div className="bg-[#172842] min-h-screen py-16">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
            <div className="mb-4">
              <TodoForm />
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="todos">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col gap-y-3">
                    {todos.map((todo, index) => (
                      <Draggable key={todo.id.toString()} draggableId={todo.id.toString()} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="w-full"
                          >
                            <TodoItem todo={todo} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </Todoprovider>
    </section>
  );
};

export default Page;
