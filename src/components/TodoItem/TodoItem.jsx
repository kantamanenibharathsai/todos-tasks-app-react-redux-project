import { MdOutlineDelete } from "react-icons/md";
import {useDispatch} from "react-redux"
import {editTodoActionCreator} from "../../actions"
import {deleteTodoActionCreator} from "../../actions"
import "./TodoItem.css"

const TodoItem = ({eachTodo}) => {
    const {text, isCompleted} = eachTodo
    const dispatch = useDispatch()
    

    const onHandleCheckBox = (e) => {
        // const labelEl = document.querySelector(`input[id='${e.target.id}'] ~ div.label-container.d-flex.flex-row > label`)
        if(e.target.checked) {
          // labelEl.classList.add("striked")
          // console.log(e.target.id, typeof(e.target.id))
           dispatch(editTodoActionCreator({id: e.target.id, taskStriked: true}))
        }
        else {
           // labelEl.classList.remove("striked")
            dispatch(editTodoActionCreator({id: e.target.id, taskStriked: false}))
        }
    }

    return(
        <li className="todo-item-container d-flex flex-row align-items-center">
            <input onChange={onHandleCheckBox} id={eachTodo.id} type="checkbox" className="checkbox-input" checked={isCompleted}/>
            <div className="label-container d-flex flex-row align-items-center">
                <label htmlFor={eachTodo.id} className={isCompleted ? `checkbox-label ${'striked'}` : "checkbox-label"}>{text}</label>
            <div className="delete-icon-container">
                <button className="delete-icon-button" type="button" onClick={() => dispatch(deleteTodoActionCreator(eachTodo.id))}>
                <MdOutlineDelete className="delete-icon"/>
                </button>
            </div>
            </div>
        </li>
    )
}

export default TodoItem