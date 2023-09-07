import {createStore} from "redux"

const parsedData = JSON.parse(localStorage.getItem("todosTasksObject"))
const initialState = parsedData !== null ? parsedData : {todosArray: []}
// console.log(initialState, "storestate")
const todoReducer = (state = initialState, action) => {
    
    switch(action.type) {

        case "ADD_TODO":
            return {...state, todosArray: [...state.todosArray, {id: action.payload.id, text: action.payload.text, isCompleted:action.payload.isCompleted }]};
         
        case "EDIT_TODO":
            const newTododsArray = state.todosArray.map((eachTodo) => eachTodo.id === action.payload.id ? {...eachTodo, isCompleted: action.payload.taskStriked} : eachTodo)
            return {...state, todosArray: newTododsArray}
        
        case "DELETE_TODO":
            const filteredTodosArray = state.todosArray.filter((eachTodo) => eachTodo.id !== action.payload)
            return {...state, todosArray: filteredTodosArray}
            
        default:
            return state;
    }
}

const store = createStore(todoReducer);

export default store;