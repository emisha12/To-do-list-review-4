import {ToDoActionBar} from './todo-action-bar';
import {ToDoItem} from './todo-item';

function ToDoManager() {
    this.listOfToDoMap = new Map();
}

ToDoManager.prototype.init = function() {     
    const toDoItem = new ToDoItem();
    const toDoActionBar = new ToDoActionBar();
    toDoActionBar.init(this);
    toDoItem.init(this);
}

ToDoManager.prototype.render = function() {
    var toDoContainer = document.getElementById("todo-list-wrapper");
    toDoContainer.innerHTML="";

    for(var key of this.listOfToDoMap.keys()){
        document.getElementById("todo-list-wrapper").appendChild(this.listOfToDoMap.get(key).cloneTemplate);
    }
}


export {ToDoManager};