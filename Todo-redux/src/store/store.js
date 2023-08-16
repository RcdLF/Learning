import { configureStore } from '@reduxjs/toolkit'
import  toDoSlice  from './SliceTodo/ToDo'

export default configureStore({
  reducer: {
    todos : toDoSlice
  },
})