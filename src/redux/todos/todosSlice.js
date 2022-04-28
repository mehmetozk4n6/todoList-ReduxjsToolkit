import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

// createSlice datayı kendisi klonladığından tekrar yapmamıza gerek yok

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [
      {
        id: 1,
        title: "Learn React",
        completed: true,
      },
      {
        id: 2,
        title: "Read a Book",
        completed: false,
      },
    ],
    activeFilter: "all",
  },
  reducers: {
    // dispatch edildiğinde ilk prepare düşer ordan çıkan obje reducer a gider
    addTodo: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: (title) => {
        return {
          payload: {
            id: nanoid(),
            completed: false,
            title,
          },
        };
      },
    },
    toggle: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find((item) => item.id === id);
      item.completed = !item.completed;
    },
    destroy: (state, action) => {
      state.items = [
        ...state.items.filter((item) => item.id !== action.payload.id),
      ];
    },
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      state.items = [...state.items.filter((item) => item.completed === false)];
    },
  },
});

export const selectTodos = (state) => state.todos.items;
export function selectFilteredTodos(state) {
  let activeFilter = state.todos.activeFilter;
  let items = state.todos.items;
  return activeFilter === "all"
    ? items
    : activeFilter === "active"
    ? items.filter((item) => item.completed === false)
    : items.filter((item) => item.completed === true);
}
export const selectActiveFilter = (state) => state.todos.activeFilter;

export const { addTodo, toggle, destroy, changeActiveFilter, clearCompleted } =
  todosSlice.actions;
export default todosSlice.reducer;
