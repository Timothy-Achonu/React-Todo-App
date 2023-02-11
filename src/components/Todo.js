import { useState } from "react";

const Todo = ({ todo, deleteTodo, edit, save }) => {
  const [isComplete, setIsComplete] = useState(false);
  const [isEditting, setIsEditting] = useState(false);

  function handleIsComplete() {
    setIsComplete((prev) => {
      return !prev;
    });
  }
  function handleEditting(todo, e) {
    // edit()
    let inputElement = e.target.parentElement.
    previousSibling.children[2]
    inputElement.value = todo.text
    setIsEditting((prev) => {
      return !prev;
    });
    if(isEditting) {
      // console.log('In edit');
      save(todo.id);
    }
  }
  return (
    <>
      {/* 
      WHEN You CLICK EDIT WHAT SHOULD BE IN THE INPUT SHOULD BE 
      THE TEXT OF THAT TODO.
      */}
      <li>
        <div>
          <span className="num">{todo.id + 1}</span>
          <span
            className={`text ${isComplete ? "complete" : ""} ${
              isEditting ? "hide" : ""
            }`}
          >
            {todo.text}{" "}
          </span>
          <input 
          type="text" 
          className={`${isEditting ? "show" : ""}`} 
          onChange={(e) => edit(todo.id,e)}
          // value={todo.text}
          />
        </div>
        <div className="btns-wrapper">
          <button className="edit-btn" 
          onClick={(e) => handleEditting(todo,e)}>
            {isEditting ? "Save" : "Edit"}
          </button>
          <button
            className={`complete-btn ${isEditting ? "disabled" : ""}`}
            onClick={ handleIsComplete}
          >
            {isComplete ? "Undo" : "Complete"}
          </button>
          <button
            className={`delete-btn ${isEditting ? "disabled" : ""}`}
            onClick={() => deleteTodo(todo.id)}
          >
            Delete
          </button>
        </div>
      </li>
    </>
  );
};

export default Todo;
