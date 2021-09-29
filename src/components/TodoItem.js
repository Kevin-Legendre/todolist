import React, { useState } from "react";

export function TodoItem({
  id,
  title,
  isCompleted,
  isEditing,
  onCompletionChange,
  onDelete,
  onTodoDoubleClickOfTheDeath,
  changeTodoTitle,
  changeTodoEditingState
}) {
  const [oldTitle, setOldTitle] = useState(title);
  return (
    <div className="todo-item">
      <span onClick={() => onCompletionChange(id)}>
        {isCompleted ? "complete" : "uncomplete"}{" "}
      </span>

      {/* 
  // DoubleClick => on doit changer la propriété isEditing de notre todo
  // Afficher un input pour éditer le titre => il doit écouter la touche entrée | la touche echap  
  */}
      {isEditing ? (
        <input
          autoFocus
          type="text"
          value={title}
          onChange={({ target: { value } }) => changeTodoTitle(id, value)}
          onKeyDown={({ key }) => changeTodoEditingState(key, id, oldTitle)}
        />
      ) : (
        <span
          className={isCompleted ? "todo-title striked" : "todo-title"}
          onDoubleClick={() => onTodoDoubleClickOfTheDeath(id)}
        >
          {title}
        </span>
      )}

      <span onClick={() => onDelete(id)}> Delete</span>
    </div>
  );
}
