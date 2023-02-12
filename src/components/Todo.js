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
  function handleEditting(todo) {
    //INPUT REF FOCUS
    inputRef.current.focus();
    inputRef.current.value = todo.text
    setIsEditting((prev) => {
      return !prev;
    });
    if(isEditting && isChangeMade) {
      setIsChangeMade(false)
      save(todo.id);
    }
  }
  function handleKeyEvent(e) {
     if(e.key == 'Enter') {
         handleEditting(todo)
     }
  }
  return (
    <>
      <li>
        <div>
          <span className="num">{todo.id + 1}.</span>
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
          onKeyDown={handleKeyEvent}
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
