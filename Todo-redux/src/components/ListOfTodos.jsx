import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteToDo } from "../store/SliceTodo/ToDo";
import Modal from "./Modal";

import { Button, List, ListItem, ListItemText } from '@mui/material';


export default function ListOfTodos({todos}) {
    const [isOpen,setIsOpen] = useState(false)
    const [selectedId, setSelectedId] = useState()
    const dispatch = useDispatch();

    const handleDelete = (id) =>{
        dispatch(deleteToDo(id))
    }

  return (
    <div>
        <List>
            {todos.map((todo) => (
                <ListItem key={todo.id}>                   
                    {
                        selectedId === todo.id ? <Modal todo={todo} isOpen={isOpen} setIsOpen={setIsOpen} setSelectedId={setSelectedId}/> : <>
                        <input type="checkbox" value={todo.completed}/>
                        <ListItemText primary={todo.task}/>
                        <Button onClick={() => {setIsOpen(!isOpen), setSelectedId(todo.id)}}>
                        Editar
                        </Button>
                        </>
                    }
                    <Button onClick={() => {handleDelete(todo.id)}}>
                    Eliminar
                    </Button>
                </ListItem>
            ))}
        </List>
      
    </div>
  )
}
