const input = document.getElementById("input");
const button = document.getElementById("button");
const list = document.getElementById("list");

const deleteCompleted = document.getElementById("delete-comp");

let todoList = [];

let DISPLAY_ITEM = {
  all: "all",
  active: "active",
  completed: "completed"
}

button.addEventListener("click", add);
deleteCompleted.addEventListener("click", deleteComp);

function add() {
  const newTodoEnter = input.value.trim();
  if (newTodoEnter === "") {
    return;
  }
  todoList.push({
    todo: newTodoEnter,
    isComplete: false,
    display: DISPLAY_ITEM.active
  });
  input.value = "";
  renderTodoList();
  activeCount();
}


function deleteItemFromList(index) {
  todoList.splice(index, 1);
  renderTodoList();
  activeCount();
}

function completeTodo(index) {
  todoList[index].isComplete = !todoList[index].isComplete;
  todoList[index].display =  "completed"  ;
  renderTodoList();
}


function deleteComp() {
  todoList = todoList.filter((item) => {
    return !item.isComplete;
  });
  renderTodoList(todoList);
  activeCount();
}


function renderTodoList(display = "all") {
  list.innerHTML = "";
  if (display) {
    return todoList.filter((item, index) => {
      const p = document.createElement("p");
      p.appendChild(document.createTextNode(`${item.todo}`));
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "✗";
      deleteButton.addEventListener("click", function () {
        deleteItemFromList(index);
      });
      p.appendChild(deleteButton);
  
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => {
        const newTodo = prompt("Edit todo", item.todo);
        if (newTodo) {
          item.todo = newTodo;
          renderTodoList();
        }
      });
      p.appendChild(editButton);
  
      const completeButton = document.createElement("input");
      completeButton.type = "checkbox";
      completeButton.checked = item.isComplete;
      completeButton.addEventListener("click", () => completeTodo(index));
      p.appendChild(completeButton);
      if (item.isComplete) {
        p.classList.add("completed");
      }
      activeCount();
      
      list.appendChild(p);
    });
  } else if (display = "active") {
    todoList.filter((item, index)=> {
      item[index].display === DISPLAY_ITEM.active;}) 
  } else {
    todoList.filter((item, index)=> {
      item[index].display === DISPLAY_ITEM.completed;}) 
  }

  // todoList.map((item, index) => {
  //   const p = document.createElement("p");
  //   p.appendChild(document.createTextNode(`${item.todo}`));

  //   const deleteButton = document.createElement("button");
  //   deleteButton.textContent = "✗";
  //   deleteButton.addEventListener("click", function () {
  //     deleteItemFromList(index);
  //   });
  //   p.appendChild(deleteButton);

  //   const editButton = document.createElement("button");
  //   editButton.textContent = "Edit";
  //   editButton.addEventListener("click", () => {
  //     const newTodo = prompt("Edit todo", item.todo);
  //     if (newTodo) {
  //       item.todo = newTodo;
  //       renderTodoList();
  //     }
  //   });
  //   p.appendChild(editButton);

  //   const completeButton = document.createElement("input");
  //   completeButton.type = "checkbox";
  //   completeButton.checked = item.isComplete;
  //   completeButton.addEventListener("click", () => completeTodo(index));
  //   p.appendChild(completeButton);
  //   if (item.isComplete) {
  //     p.classList.add("completed");
  //   }
  //   activeCount();
    
  //   list.appendChild(p);
    
  // });
  
}



// document.getElementById("all").addEventListener("click", () => {
//   // renderTodoList(todoList);
//   console.log(todoList);
// });

// document.getElementById("active").addEventListener("click", () => {
//   const active = todoList.filter((item) => item.display === "active");
//   renderTodoList(active);
// });


// document.getElementById("completed").addEventListener("click", () => {
//   const completed = todoList.filter((item) => item.display === "completed");
//   renderTodoList(completed);
//   console.log(completed);
// });


function activeCount() {
  active = todoList.filter((item) => item.isComplete === false);
  const countElement = document.getElementById("count");
  countElement.innerText = active.length.toString() + " item left";
}

document.getElementById("toggle-all").addEventListener("click", toggleAll);

function toggleAll() {
  const allComplete = todoList.every((item) => item.isComplete);
  todoList.forEach((item) => {
    item.isComplete = !allComplete;
  });
  renderTodoList();
}