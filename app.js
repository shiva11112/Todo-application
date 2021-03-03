todos = getTodos()

const filterText = {
    searchText: '',   
}

const searchTextFromNotes = function(todos, filterText) {
    let filteredTodos = getFilteredTodos(todos, filterText)
    let completedTodoArr = compltedTodos(todos)
    document.querySelector("#todo-div").innerHTML = ''
    const leftTodos = document.querySelector('#left-todo-heading')
    leftTodos.textContent = `You have ${completedTodoArr.length} to dos left`
    renderHTMLElForTodoItem(filteredTodos)   
}

searchTextFromNotes(todos, filterText)

// input event of search text box
const searchTextBox = document.querySelector("#search-text")
searchTextBox.addEventListener('input', function(e){    
    filterText.searchText = e.target.value    
    searchTextFromNotes(todos, filterText)
})

//Add to do from text box
document.querySelector('#add-form').addEventListener('submit', function(e){
    e.preventDefault()
    const id = uuidv4()
    todos.push({
        id: id,
        title: e.target.elements.addText.value,
        completed: false,        
    })
    localStorage.setItem('todos', JSON.stringify(todos))
    e.target.elements.addText.value = ''
    searchTextFromNotes(todos, filterText) 
    // location.assign(`/edit.html#${id}`)   
})

//
document.querySelector('#hide-completed-chkbox').addEventListener('click', function(e) {
    searchTextFromNotes(todos, filterText)
})