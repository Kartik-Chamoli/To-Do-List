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
  for (let i = todoList.todos.length - 1; i >= 0; i--) {
    if (todoList.todos[i].completed === true) {
      todoList.todos.splice(i, 1);
    }
  }
  todoList.displayTodos();
});

let todoList = {
  todos: [],

  displayTodos: function() {
    var todosUl = document.querySelector("ul");
    todosUl.innerHTML = "";

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
      todoLi.style.backgroundColor = todo.listColor;

      view.createListColors().forEach(function(item) {
        todoLi.appendChild(item);
      });

      todoLi.appendChild(view.createDeleteButton());
      todoLi.prepend(view.createCheckBox());
      todosUl.appendChild(todoLi);
      todoLi.style.order = todo.listorder;
      document.getElementsByClassName("toggle")[index].checked = todo.completed;
    });
  },

  addTodos: function(textValue) {
    let splitObj;
    let splitArr;
    splitArr = textValue.split(" : ");

    if (splitArr == "") return false;

    for (let i = 0; i < splitArr.length; i++) {
      splitObj = {};
      splitObj.todoText = splitArr[i];
      splitObj.completed = false;
      splitObj.listColor = null;
      splitObj.listOrder = 3;
      todoList.todos.push(splitObj);
    }
    splitArr = [];
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
  },
  createListColors: function() {
    let liColor;
    let spanArr = [];
    for (let i = 0; i < 3; i++) {
      liColor = document.createElement("span");
      liColor.className = "color" + i; //color0: lightgreen , color1:lightpink, color2:lightblue
      spanArr[i] = liColor;
    }
    return spanArr;
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
  } else if (elementClicked.tagName === "SPAN") {
    let colorClicked = getComputedStyle(elementClicked).backgroundColor;
    elementClicked.parentNode.style.backgroundColor = colorClicked;
    listOperations.sortOrder(colorClicked, parId);
  }
});

let listOperations = {
  toggleTodos: function(elementClicked, parId) {
    if (elementClicked.checked === true) {
      todoList.todos[parId].completed = true;
      elementClicked.parentNode.style.textDecoration = "line-through";
    } else {
      todoList.todos[parId].completed = false;
      elementClicked.parentNode.style.textDecoration = "none";
    }
  },

  sortOrder: function(colorClicked, parId) {
    todoList.todos[parId].listColor = colorClicked;
    if (colorClicked === "rgb(179, 233, 199)") {
      //Blue color
      document.getElementById(parId).style.order = 1;
      todoList.todos[parId].order = 1;
    } else if (colorClicked === "rgb(252, 200, 194)") {
      //Pink color
      document.getElementById(parId).style.order = 0;
      todoList.todos[parId].order = 0;
    } else if (colorClicked === "rgb(153, 209, 123)") {
      //Green color
      document.getElementById(parId).style.order = 2;
      todoList.todos[parId].order = 2;
    }
  }
};
