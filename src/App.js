import { useState, useRef} from "react";
import "./App.css";
import Todo from "./components/Todo";


export default function App() {
  const [Todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ text: "", id: null });
  const [isChangeMade, setIsChangeMade] = useState(false)
  const inputRef = useRef(null)

  function addTodos() {
    inputRef.current.value = ""
    if (newTodo.text) {
      setTodos((prevTodos) => {
        return [...prevTodos, newTodo];
      });
    }
    setNewTodo({ text: "", id: null });
  }
  function handleInputTodo(e) {
    setNewTodo({ text: e.target.value.trim(), id: Todos.length });
  }
  console.log(newTodo)
  function handleKeyEvent(e) {
    // console.log(e.key)
    if(e.key == 'Enter') {
      addTodos()
    }
  }
  function deleteTodo(id) {
    // console.log(id);
    setTodos((prevTodos) => {
      let filteredTodos = prevTodos.filter((todo) => {
        return todo.id !== id;
      });
      return filteredTodos.map((item, index) => {
        return { text: item.text, id: index };
      });
    });
  }
  function editTodo(id, e) {
    setIsChangeMade(true)
    setNewTodo({ text: e.target.value.trim(), id: id });
  }
  function saveEdit(id) {
    // console.log('in save', id);
    setTodos((prev) => {
     return prev.map((item) => {
        if ((item.id === id)) {
          return newTodo;
        } else {
          return item;
        }
      });
    });
  }
  const todoElements = Todos.map((todo, index) => {
    // console.log(todo);
    return (
      <Todo
        todo={todo}
        deleteTodo={deleteTodo}
        edit={editTodo}
        save={saveEdit}
        isChangeMade={isChangeMade}
        setIsChangeMade={setIsChangeMade}
        key={index}
      />
    );
  });
  return (
    <main className="App">
      <h1>Todo List </h1>
      <div className="add-todo-wrapper">
        <input
          type="text"
          ref={inputRef}
          onChange={handleInputTodo}
          onKeyPress={handleKeyEvent}
          placeholder="Enter your todo"
        />
        <button className="add-todo-btn" onClick={addTodos}>
          Add todo
        </button>
      </div>
      {Todos.length > 0 && <ul>{todoElements}</ul>}
    </main>
  );
}
