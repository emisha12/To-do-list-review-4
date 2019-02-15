import {ToDoItem} from "./todo-item";

function ToDoActionBar(){
    this.checkExistanceInList = function(toDoText,toDoManager){
        var exists;
        var toDoInput = document.getElementById("text-Box1"); 
        for(var key of toDoManager.listOfToDoMap.keys()){
            if(toDoManager.listOfToDoMap.get(key).toDoText === toDoText) {
                toDoInput.value = "";
                alert("This already exists in the To Do List. Please enter another event.");
                exists = 1;
                break;
            }else {
                exists = 0;
            }
        }
        return exists;
    }
}
    
ToDoActionBar.prototype.init = function(toDoManager){
    var that = this; 
    document.getElementById("addBtn").addEventListener('click', function() {
        that.addToDoEvent(toDoManager);
    });
    document.getElementById("delete-selected-Btn").addEventListener('click', function() {
        that.deleteSelected(toDoManager)
    });
    document.getElementById("delete-completed-Btn").addEventListener('click', function(){
        that.deleteCompleted(toDoManager);
    });
}
    
ToDoActionBar.prototype.addToDoEvent = function(toDoManager){     
    var toDoEvent, clone, timeStampValue;  
    var toDoInput = document.getElementById("text-Box1");      
    var toDoText = toDoInput.value;
    const toDoItem = new ToDoItem();
    if(!toDoText) {
        alert("enter some content");
    }else {  
        if(!this.checkExistanceInList(toDoText, toDoManager)) {
            timeStampValue = new Date().getTime();
            clone = toDoItem.createTemplate(toDoText, timeStampValue);
            //clearing the text box
            toDoInput.value = "";

            toDoEvent = new ToDoItem(timeStampValue, toDoText, false, false, clone);
            toDoManager.listOfToDoMap.set(timeStampValue, toDoEvent);
            toDoManager.render();
        }      
    }
} 
      
ToDoActionBar.prototype.deleteCompleted = function(toDoManager) {
    for(var key of toDoManager.listOfToDoMap.keys()){
        if(toDoManager.listOfToDoMap.get(key).toDoStatus){
            toDoManager.listOfToDoMap.delete(key);
            toDoManager.render();
        }
    }
}
    
ToDoActionBar.prototype.deleteSelected = function(toDoManager){  
    for(var key of toDoManager.listOfToDoMap.keys()){
        if(toDoManager.listOfToDoMap.get(key).toDoChecked){
            toDoManager.listOfToDoMap.delete(key);
            toDoManager.render();
        }
    }
}

export {ToDoActionBar};