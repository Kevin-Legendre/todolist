import "./App.css";
import { TodoFilter, TodoInput, TodoList } from "./components";
import { useEffect, useState } from "react";

const todoModel = {
  id: 1,
  title: "",
  isCompleted: false,
  isEditing: false,
};

function App() {
  const [newTodo, setNewTodo] = useState(todoModel);
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [todoCounter, setTodoCounter] = useState(1);

  useEffect(() => {
    console.log(todos);
    switch (filter) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.isCompleted));
        break;

      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => !todo.isCompleted));
        break;

      default:
        setFilteredTodos(todos);
        break;
    }
  }, [filter, todos]);

  const handleInputChange = ({ target: { value } }) => {
    setNewTodo(Object.assign({}, todoModel, { title: value }));
  };

  const handleKeyEvent = ({ key }) => {
    console.log(key);
    if (key === "Escape") {
      setNewTodo({
        ...newTodo,
        title: "",
      });
    }
    if (key === "Enter") {
      //doit vider le titre
      // incrémenter l'id
      // ajouter la todo à la liste
      if (newTodo.title !== "") {
        setTodos((prevState) => [...prevState, newTodo]);
        setTodoCounter((oldCounter) => {
          Object.assign(todoModel, { id: todoCounter + 1 });
          return oldCounter + 1;
        });
        setNewTodo((oldTodo) => ({
          ...oldTodo,
          title: "",
        }));
      }
    }
  };

  const changeTodoState = (id) => {
    setTodos((state) =>
      state.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id) => {
    setTodos((state) => state.filter((todo) => id !== todo.id));
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const handleEditingChange = (id) => {
    setTodos((state) =>
      state.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isEditing: true };
        }
        return todo;
      })
    );
  };

  const handleUpdateTodoTitle = (id, value) => {
    setTodos((state) =>
      state.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title: value };
        }
        return todo;
      })
    );
  };

  const handleTodoEditingState = (key, id, oldTitle) => {
    console.log(key)
    if (key === "Enter") {
      setTodos((state) =>
        state.map((todo) => {
          if (todo.id === id) {
            return { ...todo, isEditing: false };
          }
          return todo;
        })
      );
    }
    if (key === "Escape") {
      setTodos((state) =>
        state.map((todo) => {
          if (todo.id === id) {
            return { ...todo, isEditing: false, title: oldTitle };
          }
          return todo;
        })
      );
    }
  };

  const deleteCompletedTodo = () => {
    setTodos(state => state.filter((todo) => !todo.isCompleted))
  }

  return (
    <div className="App">
      <TodoInput
        text={newTodo.title}
        onKeyEvent={handleKeyEvent}
        onInputChange={handleInputChange}
      />
      <TodoFilter onFilterChange={handleFilterChange} />
      <TodoList
        onTodoDoubleClick={handleEditingChange}
        onTodoCompletionChange={changeTodoState}
        onDeleteTodo={deleteTodo}
        updateTodoTitle={handleUpdateTodoTitle}
        handleTodoEditingState={handleTodoEditingState}
        items={filteredTodos}
      />
      {/* Le composant doit afficher :
        - L'input
        - le composant qui affiche les filtres
        - La liste des todos 
      */}
      {todos.find((todo) => todo.isCompleted) && <span onClick={deleteCompletedTodo}> y'en a</span>}
    </div>
  );
}

export default App;
