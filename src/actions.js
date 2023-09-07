export const addTodoActionCreator = (data) => ({type: "ADD_TODO", payload:data})
    
export const editTodoActionCreator = (data) => ({type: "EDIT_TODO", payload:data})

export const deleteTodoActionCreator = (id) => ({type: "DELETE_TODO", payload:id})
    
