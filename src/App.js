import { useState } from "react";
import "./App.css";
import Todo from "./components/Todo";

export default function App() {
  const [Todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ text: "", id: null });

  function addTodos() {
    // console.log(Todos)
    if (newTodo) {
      // console.log("here.");
      setTodos((prevTodos) => {
        return [...prevTodos, newTodo];
      });
    }
    setNewTodo({ text: "", id: null });
    // console.log(Todos);
  }
  function handleInput(e) {
    setNewTodo({ text: e.target.value, id: Todos.length });
    // console.log(newTodo);
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
    // e.target.value = e.target.value;
    // Todos.forEach((todo) => {
    //   if(todo.id = id) {
    //     e.target.value = todo.text;
    //   }
    // })
    // console.log(e, 'id: ', id);
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
          onBlur={(e) => {
            e.target.value = "";
          }}
        />
        <button className="add-todo-btn" onClick={addTodos}>
          Add todo
        </button>
      </div>
      {Todos.length > 0 && <ul>{todoElements}</ul>}
    </main>
  );
}
