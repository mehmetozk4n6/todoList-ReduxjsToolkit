import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
    return res.data;
  }
);
export const addTodosAsync = createAsyncThunk(
  "todos/addTodosAsync",
  async (data) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`,
      data
    );
    return res.data;
  }
);
export const toggleTodoAsync = createAsyncThunk(
  "todos/toggleTodoAsync",
  async ({ id, data }) => {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`,
      data
    );
    return res.data;
  }
);
export const removeItemAsync = createAsyncThunk(
  "todos/removeItemAsync",
  async (id) => {
    await axios.delete(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`
    );
    return id;
  }
);

// createSlice datayı kendisi klonladığından tekrar yapmamıza gerek yok
export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: localStorage.getItem("activeFilter"),
    addNewTodo: { isLoading: false, error: null },
  },
  reducers: {
    // dispatch edildiğinde ilk prepare düşer ordan çıkan obje reducer a gider
    // addTodo: {
    //   reducer: (state, action) => {
    //     state.items.push(action.payload);
    //   },
    //   prepare: (title) => {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         completed: false,
    //         title,
    //       },
    //     };
    //   },
    // },
    // toggle: (state, action) => {
    //   const { id } = action.payload;
    //   const item = state.items.find((item) => item.id === id);
    //   item.completed = !item.completed;
    // },
    // destroy: (state, action) => {
    //   state.items = [
    //     ...state.items.filter((item) => item.id !== action.payload.id),
    //   ];
    // },
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    // clearCompleted: (state) => {
    //   state.items = [...state.items.filter((item) => item.completed === false)];
    // },
  },
  extraReducers: {
    // get to do
    [getTodosAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    [getTodosAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },

    // add to do
    [addTodosAsync.pending]: (state, action) => {
      state.addNewTodo.isLoading = true;
    },
    [addTodosAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.addNewTodo.isLoading = false;
    },
    [addTodosAsync.rejected]: (state, action) => {
      state.aaddNewTodo.isLoading = false;
      state.addNewTodo.error = action.error.message;
    },

    // toggle to do
    [toggleTodoAsync.fulfilled]: (state, action) => {
      const { id, completed } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      state.items[index].completed = completed;
    },

    // remove item todo
    [removeItemAsync.fulfilled]: (state, action) => {
      const id = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      state.items.splice(index, 1);
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

export const { changeActiveFilter } = todosSlice.actions;
export default todosSlice.reducer;
