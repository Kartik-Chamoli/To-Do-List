let AddTodo = document.getElementsByClassName("input-box")[0];
AddTodo.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    let todoTextInput = document.getElementsByClassName("input-box")[0];
    todoList.addTodos(todoTextInput.value);
    todoTextInput.value = "";
  }
});

let TogAllTodo = document.getElementById("TogAllTodo");
TogAllTodo.addEventListener("click", function() {
  todoList.toggleAll();
});

let DeleteAllTodo = document.getElementById("DeleteAllTodo");
DeleteAllTodo.addEventListener("click", function() {
  let todoSize = todoList.todos.length;
  todoList.todos.splice(0, todoSize);
  todoList.displayTodos();
});

let DeleteMarkedTodo = document.getElementById("DeleteMarked");
DeleteMarkedTodo.addEventListener("click", function(event) {
	todoList.todos.forEach(function (item , index){
		if(item.completed === true){
			todoList.deleteTodos(index);
		}
	});
});

let todoList = {
  todos: [],

  displayTodos: function() {
    var todosUl = document.querySelector("ul");
    todosUl.innerHTML = ""; //For inserting list in dom

    this.todos.forEach(function(todo, index) {
      var todoLi = document.createElement("li");
      todoLi.id = index;
      todoLi.textContent = todo.todoText;
      if (todo.completed === true) {
        todoLi.textContent = todo.todoText;
        todoLi.style.textDecoration = "line-through";
      } else {
        todoLi.textContent = todo.todoText;
      }
      todoLi.appendChild(view.createDeleteButton());
      todoLi.prepend(view.createCheckBox());
      todosUl.appendChild(todoLi);
      document.getElementsByClassName("toggle")[index].checked = todo.completed;
    });
  },

  addTodos: function(item) {
    if (item === "") {
      return false;
    }
    this.todos.push({
      todoText: item,
      completed: false
    });
    this.displayTodos();
  },

  changeTodos: function(index, text) {
    this.todos[index].todoText = text;
    this.displayTodos();
  },

  deleteTodos: function(index) {
    this.todos.splice(index, 1);
    this.displayTodos();
  },

  toggleCompleted: function(index) {
    this.todos[index].completed = !this.todos[index].completed;
    this.displayTodos();
  },

  toggleAll: function() {
    let totalTodos = this.todos.length;
    let completedTodos = 0;
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });

    this.todos.forEach(function(todo) {
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else {
        todo.completed = true;
      }
    });
    this.displayTodos();
  }
};

var view = {
  createDeleteButton: function() {
    let delBtn = document.createElement("button");
    delBtn.className = "deleteButton";
    return delBtn;
  },
  createCheckBox: function() {
    let chkBox = document.createElement("input");
    chkBox.type = "checkbox";
    chkBox.className = "toggle";
    return chkBox;
  }
};

var todosUl = document.querySelector("ul");
todosUl.addEventListener("click", function(event) {
  var elementClicked = event.target;
  var parId = elementClicked.parentNode.id;
  if (elementClicked.className === "deleteButton") {
    document.getElementsByClassName("deleteButton")[parId].style.right = "5px";
    setTimeout(function() {
      todoList.deleteTodos(parseInt(event.target.parentNode.id));
    }, 200);
  } else if (elementClicked.className === "toggle") {
    listOperations.toggleTodos(elementClicked, parId);
  }
});

let listOperations = {
	toggleTodos : function(elementClicked, parId){
		if (elementClicked.checked === true) {
			todoList.todos[parId].completed = true;
			elementClicked.parentNode.style.textDecoration = "line-through";
		  } else {
			todoList.todos[parId].completed = false;
			elementClicked.parentNode.style.textDecoration = "none";
		  }
	},
}