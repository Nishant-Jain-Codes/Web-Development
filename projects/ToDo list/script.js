let tasks =[];
let taskList = document.getElementById('list');
let addTaskInput = document.getElementById('add');
let tasksCounter = document.getElementById('tasks-counter');
function addTaskToDOM(task)
{
    const listele = document.createElement('li');
    listele.innerHTML=`
            <input 
            type="checkbox" 
            id="${task.id}" 
            ${task.done ? 'checked' : ''}
            class="custom-checkbox">
            <label  for="${task.id}">${task.text}</label>
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
        return t.id===taskId;
    });
    if(task.length>0)
    {
        let curTask = task[0];
        curTask.done= (!curTask.done);
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
        return task.id!== taskId;
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
function showNotification(text)
{
    console.log(text);
}
function handelInputKeypress(e)
{
    if(e.key==='Enter')
    {
        let text = e.target.value;
        if(!text)
        {
            showNotification("task can't be empty");
            return ;
        }
        const task = {
            text,
            id:Date.now().toString(),
            done:false,
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
    addTaskInput.addEventListener('keyup' , handelInputKeypress);
    document.addEventListener('click',handelClickListner);
}
initialiseApp();
