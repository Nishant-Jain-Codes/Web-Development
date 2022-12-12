(function()
{
    let tasks =[];
    let taskList = document.getElementById('list');
    let addTaskInput = document.getElementById('add');
    let tasksCounter = document.getElementById('tasks-counter');
    function fetchTodos()
    {
        // get request 
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(function(response)
            {
                return response.json();
            })
            .then(function(data)
            { 
                tasks=data.slice(0,10);
                renderList();
            })
            .catch(function(error)
            {
                console.log('error',error);
            })
    }
    function addTaskToDOM(task)
    {
        const listele = document.createElement('li');
        listele.innerHTML=`
                <input 
                type="checkbox" 
                id="${task.id}" 
                ${task.completed ? 'checked' : ''}
                class="custom-checkbox">
                <label  for="${task.id}">${task.title}</label>
                <img src="images/bin.png" class="delete" data-id="${task.id}" />
        `;
        taskList.append(listele);
    }
    function renderList()
    {
        taskList.innerHTML='';
        for(let i=0;i<tasks.length;i++)
        {
            addTaskToDOM(tasks[i]);
        }
        tasksCounter.innerHTML=tasks.length;
    }
    function toggleTask(taskId)
    {
        let task = tasks.filter(function(t){
            return t.id==taskId;
        });
        if(task.length>0)
        {
            let curTask = task[0];
            curTask.completed= (!curTask.completed);
            showNotification('task toggeled successfully');
            renderList();
        }
        else
        {
            showNotification('error task not found');
        }
    }
    function deleteTask(taskId)
    {
        const newtasks = tasks.filter(function(task){
            return task.id!=taskId;
        });
        tasks=newtasks;
        renderList();
        showNotification('task deleted successfully');
    }
    function addTask(task)
    {
        if(task)
        {
            tasks.push(task);
            renderList();
            showNotification('task added successfully');
        }
        else 
        {
            showNotification("task can't be added");
        }
    }
    function showNotification(title)
    {
        console.log(title);
    }
    function handelInputKeypress(e)
    {
        if(e.key==='Enter')
        {
            let title = e.target.value;
            if(!title)
            {
                showNotification("task can't be empty");
                return ;
            }
            const task = {
                title:text,
                id:Date.now(),
                completed:false,
            }
            e.target.value = '';
            addTask(task);
        }
        
    }
    function handelClickListner(e)
    {
        const target = e.target;
        if(target.className==='delete')
        {
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
        }
        else if(target.className==='custom-checkbox')
        {
            const taskId = target.id;
        toggleTask(taskId);
        return;
        }
    }
    function initialiseApp()
    {
        fetchTodos();
        addTaskInput.addEventListener('keyup' , handelInputKeypress);
        document.addEventListener('click',handelClickListner);
    }
    initialiseApp();
})();
