import { useSelector } from 'react-redux';
import Body from './components/Body';
import Header from "./components/Header";

function App() {
  const todos = useSelector((state) => state.todos)
  

  return (
   
    <>
      <Header todos={todos}/>
      <Body todos={todos}/>
    </>
  )
}

export default App
