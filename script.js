        console.log("JS connected!");
        const input = document.getElementById('todo-input');
        const addBtn = document.getElementById('add-btn');
        const todoList = document.getElementById('todo-list');
        const emptyMsg = document.getElementById('empty-msg');

        let todos = JSON.parse(localStorage.getItem('todos')) || [];

        function saveToLocalStorage() {
            localStorage.setItem('todos', JSON.stringify(todos));
        }

        function renderTodos() {
            todoList.innerHTML = '';
            
            if (todos.length === 0) {
                emptyMsg.style.display = 'block';
            } else {
                emptyMsg.style.display = 'none';
            }

            todos.forEach((todo, index) => {
                const li = document.createElement('li');
                li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
                
                li.innerHTML = `
                    <div class="checkbox" onclick="toggleComplete(${index})"></div>
                    <span class="todo-text">${todo.text}</span>
                    <div class="actions">
                        <button class="btn-action btn-edit" onclick="editTask(${index})" title="Edit Task">
                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </button>
                        <button class="btn-action btn-delete" onclick="deleteTask(${index})" title="Delete Task">
                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </div>
                `;
                todoList.appendChild(li);
            });
        }

        function addTask() {
            const text = input.value.trim();
            if (text !== '') {
                todos.push({
                    text: text,
                    completed: false
                });
                input.value = '';
                saveToLocalStorage();
                renderTodos();
            }
        }

        window.toggleComplete = (index) => {
            todos[index].completed = !todos[index].completed;
            saveToLocalStorage();
            renderTodos();
        };

        window.deleteTask = (index) => {
            todos.splice(index, 1);
            saveToLocalStorage();
            renderTodos();
        };

        window.editTask = (index) => {
            const newText = prompt('Edit task:', todos[index].text);
            if (newText !== null && newText.trim() !== '') {
                todos[index].text = newText.trim();
                saveToLocalStorage();
                renderTodos();
            }
        };

        addBtn.addEventListener('click', addTask);

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTask();
            }
        });

        // Initial render
        renderTodos();