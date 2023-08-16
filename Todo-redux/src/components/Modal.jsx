import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTodo } from "../store/SliceTodo/ToDo";



export default function Modal({isOpen,setIsOpen, todo,setSelectedId}) {
  const [input,setInput] = useState(todo.task)
  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault()
    if(input === '') return 
    const id = todo.id
    dispatch(editTodo({input, id}))
    setIsOpen(!isOpen)
    setSelectedId('')
  }





  return (
    <div>
      {
        isOpen ?
       
        <form onSubmit={handleSubmit}
        ><input
           value={input}
           onChange={(e) => setInput(e.target.value)}
           />
          <button>Edit</button>
           </form> : null
      }
    </div>
  )
}
