import React from "react";
import { TodoItem } from ".";

export function TodoList({ items, onTodoCompletionChange, onDeleteTodo, onTodoDoubleClick, updateTodoTitle, handleTodoEditingState }) {
  return(
    <>
    {items.map((todo) => (
      <TodoItem key={todo.id} onTodoDoubleClickOfTheDeath={onTodoDoubleClick} onCompletionChange={onTodoCompletionChange} onDelete={onDeleteTodo} changeTodoTitle={updateTodoTitle} changeTodoEditingState={handleTodoEditingState} {...todo}/>
    ))}
    </>
  );
}
