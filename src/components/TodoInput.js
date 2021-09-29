import React from "react";

export function TodoInput({ text, onInputChange, onKeyEvent }) {
  return (
    <input type="text" value={text} onKeyDown={onKeyEvent} onChange={onInputChange} />
  );
}
