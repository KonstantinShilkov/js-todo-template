function checkFilters() {
    tasksList.length != 0 ? footerStatus.setAttribute('style','display: block' ) : footerStatus.setAttribute('style','display: none' );
};

function countActiveTasks(){
    tasksListActive = tasksList.filter(task => !task.completed);
    itemsLeft.firstChild.textContent = tasksListActive.length;
};

function setFilterAttributes(filter) {
   
   const isAll = filter === "all"
   const isActive = filter === "active";
   const isCompleted = filter === "completed";

    ulFilters.children[0].children[0].setAttribute("class",isAll? "selected": "");
    ulFilters.children[1].children[0].setAttribute("class",isActive? "selected": "");
    ulFilters.children[2].children[0].setAttribute("class",isCompleted? "selected": "");

};

function checkClearCompleted() {
    tasksListCompleted = tasksList.filter(task => task.completed);
    if(tasksListCompleted.length !=0){
        clearCompletedButton.setAttribute('style','display: block' );
        clearCompletedButton.textContent = "Clear Completed";
    } else {
        clearCompletedButton.setAttribute('style','display: none');
    };
};   

function deleteCompletedTasks() {
    tasksList = tasksList.filter(task => !task.completed);
    const filter = getFilter();
    renderTasks(tasksList,filter);
};

function getFilter(){
    const url = window.location.href;
    if (url.includes("active")){
        return "active";
    } else
    if(url.includes("completed")){
        return "completed";
    }else
    return "all";
};

renderTasks(tasksList,filter);