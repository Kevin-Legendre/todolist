import React from "react";

export function TodoFilter({ onFilterChange }) {
  return(
    <>
    <span onClick={() => onFilterChange('all')}>All </span>
    <span onClick={() => onFilterChange('completed')}>Completed </span>
    <span onClick={() => onFilterChange('uncompleted')}>Uncompleted</span>
    </>
  ) 
}
