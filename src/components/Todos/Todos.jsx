import {useState} from "react"
import {v4} from "uuid"
import {useDispatch, useSelector} from "react-redux"
import {addTodoActionCreator} from "../../actions"
import TodoItem from "../TodoItem/TodoItem.jsx"
import "./Todos.css"

const Todos = () => {
    const dispatch = useDispatch()
    const globalState = useSelector((state) => state)
    
    const [userEnteredInput, setUserEnteredInput] = useState("")
   const [todoError, setTodoError] = useState("")


    const checkDatabase = (newTask) => {
      let isAvailable = false 
      for (let eachTodo of globalState.todosArray) {
        if (eachTodo.text.toLowerCase() === newTask.toLowerCase()) {
          isAvailable = true
          break;
        }
      }
      return isAvailable;
    }

    const addTodo =  () => {
      if (userEnteredInput === "") {
          setTodoError("Enter a New Task")
         // alert("Enter Valid Text")
       }
       else if (checkDatabase(userEnteredInput)){
            setTodoError("Task Already Exist")
       }
       else {
            const newTodoObject = {id: v4(), text: userEnteredInput, isCompleted: false}
            dispatch(addTodoActionCreator(newTodoObject)) 
            setTodoError("")
            setUserEnteredInput("")
          }
           
    }
  

    const addToLocalStorage = () => {
      const stringifiedData = JSON.stringify({todosArray: globalState.todosArray})
      localStorage.setItem("todosTasksObject", stringifiedData)
    }

  
    return (
    <div className="todos-bg-container">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="todos-heading">Todos</h1>
          <h2 className="create-task-heading">
            Create <span className="create-task-heading-subpart">Task</span>
          </h2>
          <input value={userEnteredInput} onChange={(e) => setUserEnteredInput(e.target.value)} type="text" className="todo-user-input" placeholder="What needs to be done?"/>
          {todoError !== "" && (<p className="todo-error-msg">{todoError}</p>)}
          <button onClick={addTodo} className="button" type="button">Add</button>
          <h1 className="todo-items-heading">
            My <span className="todo-items-heading-subpart">Tasks</span>
          </h1>
          <ul className="todo-items-container">
            {globalState.todosArray.map((eachTodo) => {
                 // console.log(eachTodo.id, "STRING")
                return(<TodoItem key={eachTodo.id} eachTodo={eachTodo} />)
            })}
          </ul>
          <button type="button" onClick={addToLocalStorage} className="button">Save</button>
        </div>  
      </div>
    </div>
  </div>
    
)
}
export default Todos