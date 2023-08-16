import { red } from '@mui/material/colors';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/SliceTodo/ToDo';


export default function CreateNew() {
    const [inputValue,setInputValue] = useState('')
    const [error,setError] = useState('')
    const dispatch = useDispatch();


    const handleSubmit = (e) => {
        e.preventDefault()
        if(inputValue === ''){
          setError('No puede estar vacio')
          return 
        }
        dispatch(addTodo({
          task: inputValue,
          completed : false,
        }))
        setInputValue('')
    }

  return (
    <div>
        <form onSubmit={(e) => {handleSubmit(e)}}>
            <input type="text"
             value={inputValue}
             onChange={(e) => {setInputValue(e.target.value)}}
             placeholder="Que quieres hacer?"
             autoFocus
            ></input>
            <button type="submit">Agregar tarea</button>
        </form>
        <p style={{font: red}}>{error}</p>
    </div>
  )
}
