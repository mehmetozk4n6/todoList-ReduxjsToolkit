import { useEffect } from "react";
import { removeItemAsync } from "../redux/todos/services";
import {
  changeActiveFilter,
  selectActiveFilter,
  selectTodos,
} from "../redux/todos/todosSlice";
import { useSelector, useDispatch } from "react-redux";

function ContentFooter() {
  const dispatch = useDispatch();
  const items = useSelector(selectTodos);
  const activeFilter = useSelector(selectActiveFilter);
  const itemsLeft = items.filter((item) => item.completed === false);

  useEffect(() => {
    localStorage.setItem("activeFilter", activeFilter);
  }, [activeFilter]);

  const handleDestroyAll = () => {
    if (window.confirm("Are you sure?")) {
      const completedItems = items.filter((item) => item.completed === true);
      completedItems.forEach(async (element) => {
        await dispatch(removeItemAsync(element.id));
      });
    }
  };

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

      <button className="clear-completed" onClick={handleDestroyAll}>
        Clear completed
      </button>
    </footer>
  );
}

export default ContentFooter;
