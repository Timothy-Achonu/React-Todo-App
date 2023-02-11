import { useState} from "react";
import "./App.css";
import Todo from "./components/Todo";

export default function App() {
  const [Todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ text: "", id: 500 });
  const [isChangeMade, setIsChangeMade] = useState(null)

  function addTodos(e) {
    let inputElement = e.target.previousSibling
    inputElement.value = ""
    // console.log(e.target.previousSibling)
    if (newTodo.text) {
      setTodos((prevTodos) => {
        return [...prevTodos, newTodo];
      });
    }
    setNewTodo({ text: "", id: null });
  }
  function handleInput(e) {
    setNewTodo({ text: e.target.value, id: Todos.length });
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
    setNewTodo({ text: e.target.value, id: id });
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
          onChange={handleInput}
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
