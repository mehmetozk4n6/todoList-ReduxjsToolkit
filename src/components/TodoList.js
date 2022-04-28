import React from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  toggle,
  destroy,
  selectFilteredTodos,
} from "../redux/todos/todosSlice";

function TodoList() {
  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectFilteredTodos);

  const handleDestroy = (item) => {
    if (window.confirm("Are you sure?")) {
      dispatch(destroy(item));
    }
  };

  return (
    <ul className="todo-list">
      {filteredTodos.map((item) => (
        <li className={item.completed ? "completed" : ""} key={item.id}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={item.completed}
              onChange={() => dispatch(toggle(item))}
            />
            <label>{item.title}</label>
            <button className="destroy" onClick={() => handleDestroy(item)} />
            {/* // sadece onClick olduğunda olsun dite callback ekliyoruz aksi
            takdirde component mount edilirken çağırır */}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
