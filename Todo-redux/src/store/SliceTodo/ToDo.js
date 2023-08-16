import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const toDoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const { task, completed } = action.payload;
      console.log(task, completed);
      const id = crypto.randomUUID();
      state.push({ id, task, completed: completed });
    },
    editTodo: (state, action) => {
      const { id, input } = action.payload;

      state.map((item) => {
        if (item.id === id && item.task !== input) {
          item.task = input;
        }
      });
    },
    deleteToDo: (state, action) => {
      console.log(action);
      const id = action.payload;
      return state.filter((task) => task.id !== id);
    },
  },
});

export const { addTodo, deleteToDo, editTodo } = toDoSlice.actions;

export default toDoSlice.reducer;
