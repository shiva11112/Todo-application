// get todos from localStorage
const getTodos = function() {
    let todosFromLS  = localStorage.getItem('todos')
    if(todosFromLS !== null) {
        return JSON.parse(todosFromLS)
    } else {
        return []
    }
}

// filter todos as per input
const getFilteredTodos = function(todos, filterText){
    const filteredTodos = todos.filter(function(todo){
        const hideCompletedChkboxStatus = document.querySelector('#hide-completed-chkbox').checked
        if (hideCompletedChkboxStatus){
            return !todo.completed && todo.title.toLowerCase().includes(filterText.searchText.toLowerCase())          
        } else {
            return todo.title.toLowerCase().includes(filterText.searchText.toLowerCase())          
        }
    })

    return filteredTodos
}

const compltedTodos = function(todos){
    const completedTodosArray = todos.filter(todo => !todo.completed)
    return completedTodosArray
}

// remove item from todos array
const removeItem = function (id) {
    
    const noteIndex = todos.findIndex(function(todo) {
        return todo.id === id
    })
    todos.splice(noteIndex, 1)
}

// render todo items html elements
const renderHTMLElForTodoItem = function(filteredTodos){
        
        filteredTodos.forEach(function(todo) {
        
        const div = document.createElement('div')
        const iTage = document.createElement('i')   
        const span = document.createElement('p')
        const editButton = document.createElement('a')    
        const deleteButton = document.createElement('i')
        const iTage2 = document.createElement('i')
        const completedButton =  document.createElement('input')
        
        //div styling
        div.style.height = '15px'        
        div.style.padding = '10px'                   
        
        //todo item attachment
        span.textContent = todo.title.length > 0 ? todo.title : 'Unnamed note' 
        span.className = 'todo-title'        
        span.style.textDecoration = 'none'
        span.style.fontWeight = 'bold'
        span.style.color = 'darkcyan'
        span.style.display = 'inline-block'    
        span.style.width = '425px'
        span.style.marginTop = '3px'
        if(todo.completed){
            span.style.textDecoration = 'line-through'
        } else {
            span.style.textDecoration = 'none'
        }        
        div.appendChild(span)
        
        //append icon to completed tick mark
        iTage2.className = 'far fa-check-circle'
        iTage2.style.fontSize = '20px'
        iTage2.style.color = 'cadetblue'        
        iTage2.id = 'tick-mark-symbol' 
        iTage2.addEventListener('click', function(){
            if(span.style.textDecoration === 'line-through') {
                span.style.textDecoration = 'none'
                todo.completed = false                             
            } else {
                span.style.textDecoration = 'line-through'
                todo.completed = true
            }

            debugger
            localStorage.setItem('todos', JSON.stringify(todos))            
            searchTextFromNotes(todos, filterText)            
        })      
        div.appendChild(iTage2)

        //append icon to editButton
        iTage.className = 'fas fa-edit'
        iTage.style.fontSize = '20px'
        iTage.style.marginLeft = '10px'
        editButton.style.color = 'cadetblue'        
        editButton.setAttribute('href',`/edit.html#${todo.id}`)
        editButton.appendChild(iTage)
        div.appendChild(editButton)    
        
        //delete button icon to editButton
        deleteButton.className = 'fas fa-trash-alt'
        deleteButton.style.fontSize = '20px'
        deleteButton.style.marginLeft = '10px'
        deleteButton.id = 'delete-symbol'
        deleteButton.addEventListener('click', function(e){
            removeItem(todo.id)
            localStorage.setItem('todos', JSON.stringify(todos))
            searchTextFromNotes(todos, filterText)   
        })        
        div.appendChild(deleteButton)
                    
        document.querySelector('#todo-div').appendChild(div)
    })
}

const saveTodos = function(todos){
    localStorage.setItem('todos', JSON.stringify(todos))
}