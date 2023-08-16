import ListOfTodos from "./ListOfTodos";


export default function Body({todos}) {
  return (
    <div>
      <ListOfTodos todos={todos}/>
    </div>
  )
}
