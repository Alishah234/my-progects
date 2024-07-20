document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Загрузка задач из localStorage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    };

    // Сохранение задач в localStorage
    const saveTasks = () => {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.textContent.replace('✓', '').trim(),
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Добавление задачи в DOM
    const addTaskToDOM = (task) => {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
        }
        li.textContent = task.text;
        
        // Добавление кнопки для отметки задачи как выполненной
        const completeBtn = document.createElement('button');
        completeBtn.textContent = '✓';
        completeBtn.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });
        li.appendChild(completeBtn);
        
        taskList.appendChild(li);
    };

    // Обработчик нажатия на кнопку добавления задачи
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
