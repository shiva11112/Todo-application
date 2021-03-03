const noteID = location.hash.substring(1)

const todos = getTodos()

const note = todos.find(function(note){
    return noteID === note.id
})

debugger

if(note === undefined) {
    location.assign('/index.html')
}

document.querySelector('#edit-input-box').value = note.title

const editTextBox = document.querySelector('#edit-input-box')
editTextBox.addEventListener('input', function(e) {
    console.log('from edit page')
    note.title = e.target.value
    saveTodos(todos)
})