import React from "react";
import {
  changeActiveFilter,
  clearCompleted,
  selectActiveFilter,
  selectTodos,
} from "../redux/todos/todosSlice";
import { useSelector, useDispatch } from "react-redux";

function ContentFooter() {
  const dispatch = useDispatch();
  const items = useSelector(selectTodos);
  const activeFilter = useSelector(selectActiveFilter);
  const itemsLeft = items.filter((item) => item.completed === false);

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsLeft.length}</strong> item{itemsLeft > 1 && "s"} left
      </span>
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={activeFilter === "all" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("all"))}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/"
            className={activeFilter === "active" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("active"))}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/"
            className={activeFilter === "completed" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("completed"))}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        className="clear-completed"
        onClick={() => dispatch(clearCompleted())}
      >
        Clear completed
      </button>
    </footer>
  );
}

export default ContentFooter;
