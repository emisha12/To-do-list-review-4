var ToDoItem = function(toDoId, toDoText, toDoStatus, toDoChecked, cloneTemplate) {
    this.toDoId = toDoId;
    this.toDoText = toDoText;
    this.toDoStatus = toDoStatus;
    this.toDoChecked = toDoChecked;
    this.cloneTemplate = cloneTemplate;
}

ToDoItem.prototype.init = function(toDoManager){
    var that = this;
    document.getElementById("todo-list-wrapper").addEventListener('click', function(){
        that.operations(event,toDoManager);
    });
}

ToDoItem.prototype.operations = function(event, toDoManager){
    var clickedButton, selectedToDoItemContent, toDoItemId, selectedToDoItem, selectedToDoItemContent;
        if(event.target !== event.currentTarget){
            clickedButton = event.target.getAttribute("element-type");

            var targetItem = event.target;
            toDoItemId =  (function (targetItem){
                while(true){
                    var targetAttributeValue = targetItem.getAttribute("wrapper-name");
                    if(targetAttributeValue !== "todo-wrapper"){
                        targetItem = targetItem.parentElement;
                    }else{
                        break;
                    }
                }
                return targetItem.getAttribute("todoid");
            })(targetItem);

            
            selectedToDoItem = document.querySelector(`[todoid="${toDoItemId}"]`);
            selectedToDoItemContent  = selectedToDoItem.querySelector(`[element-type="para"]`);
            switch(clickedButton) {
                case "done": 
                toDoManager.listOfToDoMap.get(parseInt(toDoItemId)).completedEvent(selectedToDoItemContent);
                toDoManager.render();
                            break;
                case "delete":
                toDoManager.listOfToDoMap.get(parseInt(toDoItemId)).deleteToDo(toDoItemId, toDoManager);
                toDoManager.render();
                            break;
                case "update":
                toDoManager.listOfToDoMap.get(parseInt(toDoItemId)).updateToDoList(toDoItemId, selectedToDoItemContent, toDoManager);
                            break;
                case "checkbox":  //selectedToDO
                toDoManager.listOfToDoMap.get(parseInt(toDoItemId)).setCheckedStatus();
                toDoManager.render();
                            break;
            }
           
    }
    event.stopPropagation();
}

ToDoItem.prototype.completedEvent = function(selectedToDoItemContent) {
    switch(this.toDoStatus) {
        case false:
            selectedToDoItemContent.classList.add("completed");
            selectedToDoItemContent.classList.remove("not-completed");
            event.target.textContent = "Not Done";
            this.toDoStatus = true;
            break;
        case true:
            selectedToDoItemContent.classList.add("not-completed");
            selectedToDoItemContent.classList.remove("completed");
            event.target.textContent = "Done";
            this.toDoStatus = false;
            break;
    }
}  

ToDoItem.prototype.setCheckedStatus= function() {
    switch(this.toDoChecked) {
        case false:
                    this.toDoChecked = true;
                    break;
        case true:
                    this.toDoChecked = false;
                    break;
    }
}

ToDoItem.prototype.updateToDoList = function(toDoItemId, selectedToDoItemContent, toDoManager){
    selectedToDoItemContent.setAttribute("contenteditable","true");
    selectedToDoItemContent.classList.add("edit-todo-text");

    selectedToDoItemContent.onkeypress = function(event) {
    if(event.keyCode === 13) {
            updateContent();
            toDoManager.render();
        }
    }

    selectedToDoItemContent.onblur = function () {
        updateContent();
        toDoManager.render();
    }

    function updateContent(){
        selectedToDoItemContent.classList.remove("edit-todo-text");
        selectedToDoItemContent.removeAttribute("contenteditable");
        toDoManager.listOfToDoMap.get(parseInt(toDoItemId)).toDoText = selectedToDoItemContent.textContent;
        console.log(toDoManager.listOfToDoMap.get(parseInt(toDoItemId)).toDoText);
    }
}

ToDoItem.prototype.deleteToDo= function(toDoItemId, toDoManager){
    toDoManager.listOfToDoMap.delete(parseInt(toDoItemId));
}

ToDoItem.prototype.createTemplate= function(toDoText, toDoId){
    var hiddenTemplate, clone;
    hiddenTemplate = document.querySelector(`[id="hidden-todo-wrapper"]`);
    clone = hiddenTemplate.cloneNode(true);
    clone.querySelector(`[element-type="para"]`).innerHTML = toDoText;
    clone.classList.add("clone");
    clone.classList.remove("todo-item");
    clone.setAttribute("todoId", toDoId);
    clone.removeAttribute("id");
    return clone;
}




export {ToDoItem};