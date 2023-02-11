import { useState, useRef } from "react";

const Todo = ({ todo, deleteTodo, edit, save, isChangeMade, setIsChangeMade }) => {
  const [isComplete, setIsComplete] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  //INPUT REF
  const inputRef = useRef(null);
  function handleIsComplete() {
    setIsComplete((prev) => {
      return !prev;
    });
  }
  function handleEditting(todo, e) {
    let inputElement = e.target.parentElement.
    previousSibling.children[2]
    //INPUT REF FOCUS
    inputRef.current.focus();
    console.log(inputRef.current)
    inputElement.value = todo.text
    // console.log(inputElement, todo.text);
    setIsEditting((prev) => {
      return !prev;
    });
    if(isEditting && isChangeMade) {
      setIsChangeMade(false)
      save(todo.id);
    }
  }
  return (
    <>
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
          {/* INPUT TO ADD FOCUS */}
          <input 
          type="text" 
          ref={inputRef}
          className={`${isEditting ? "show" : ""}`} 
          onChange={(e) => edit(todo.id,e)}
          />
        </div>
        <div className="btns-wrapper">
          {/* BUTTON TO ADD FOCUS */}
          <button className="edit-btn" 
          onClick={(e) =>  handleEditting(todo,e)}>
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
