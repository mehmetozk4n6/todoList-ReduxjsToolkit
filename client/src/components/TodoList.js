import { useEffect } from "react";

import Loading from "./Loading";
import Error from "./Error";

import { useSelector, useDispatch } from "react-redux";
import {
  toggle,
  destroy,
  selectFilteredTodos,
  getTodosAsync,
} from "../redux/todos/todosSlice";

function TodoList() {
  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectFilteredTodos);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const handleDestroy = (item) => {
    if (window.confirm("Are you sure?")) {
      dispatch(destroy(item));
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error message={error} />;
  }

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
