//selectors
const todoInput=document.querySelector(".todo-input");
const todoButton=document.querySelector(".todo-button");
const todoList=document.querySelector(".todo-list");
const filterOption=document.querySelector(".filter-todo");

//event listeners
document.addEventListener("DOMContentLoaded",getTodos); //if our contec=nt on the web page is loaded then call the function
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("click",filterTodo);


//functions
function addTodo(event) {
	// to prevent page fro submitting/ refresh
	event.preventDefault();
	//Todo DIV i.e creating the class"todo" for the div
	const todoDiv=document.createElement("div");
	todoDiv.classList.add("todo");
	//create li
	const newTodo=document.createElement("li");
	newTodo.innerText=todoInput.value;
	newTodo.classList.add("todo-item'");
	todoDiv.appendChild(newTodo);

	//adding todo to the local storage as well
	saveLocalTodos(todoInput.value);

	// CHeck mark button
	const completedButton=document.createElement("button");
	completedButton.innerHTML="check";
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton);
	// CHeck trash button
	const trashButton=document.createElement("button");
	trashButton.innerHTML="delete";
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);
	//append the division to list
	todoList.appendChild(todoDiv);
	//clear todoinput value
	todoInput.value="";
}

function deleteCheck(e){
	const item=e.target;
	//delete todo
	if(item.classList[0]=== "trash-btn")
	{
		const todo=item.parentElement;
		//adding transition
		todo.classList.add("fall"); //adding a class named "fall"
		removeLocalStorageTodos(todo); //removing the todos from local storage as well
		// adding a function to actually remove the item
		//the function will be called once the tranisiton ends
		todo.addEventListener("transitionend",function(){
			todo.remove();
		});
	}

	//CHECK MARK
	if(item.classList[0]=== "complete-btn")
	{
		const todo=item.parentElement;
		todo.classList.toggle("completed");
	}

}

function filterTodo(e)
{
	const todos=todoList.childNodes;
	todos.forEach(function(todo)
	{
		switch(e.target.value){
			case "all":
				todo.style.display="flex";
				break;
			case "completed":
				if(todo.classList.contains("completed")){
					todo.style.display="flex";
				}else{
					todo.style.display="none";
				}
				break;
			case "uncompleted":
				if(!todo.classList.contains("completed")){
					todo.style.display="flex";
				}else{
					todo.style.display="none";
				}
				break;
		}
	});
}

function saveLocalTodos(todo)
{
	//checking if we already have things in the local storage
	let todos; //declaring an array to store the todo
	if(localStorage.getItem("todos")===null)
	{
		todos=[]; // if the storage is empty then we create an array
	}
	else{
		todos=JSON.parse(localStorage.getItem("todos")); //else if we already have something in storage we parse it and put it an array
	}
	todos.push(todo); //all the todos then are pushed to the array
	localStorage.setItem("todos", JSON.stringify(todos));  // and then from array it is again parsed and set back to the local storage
}
//parse() A common use of JSON is to exchange data to/from a web server. 
//When receiving data from a web server, the data is always a string. Parse the data with JSON.

function getTodos()
{
	let todos; //declaring an array to store the todo
	if(localStorage.getItem("todos")===null)
	{
		todos=[]; // if the storage is empty then we create an array
	}
	else{
		todos=JSON.parse(localStorage.getItem("todos")); //else if we already have something in storage we parse it and put it an array
	}
	todos.forEach(function(todo){
		const todoDiv=document.createElement("div");
		todoDiv.classList.add("todo");
		//create li
		const newTodo=document.createElement("li");
		newTodo.innerText=todo;
		newTodo.classList.add("todo-item'");
		todoDiv.appendChild(newTodo);

		// CHeck mark button
		const completedButton=document.createElement("button");
		completedButton.innerHTML="add";
		completedButton.classList.add("complete-btn");
		todoDiv.appendChild(completedButton);
		// CHeck trash button
		const trashButton=document.createElement("button");
		trashButton.innerHTML="delete";
		trashButton.classList.add("trash-btn");
		todoDiv.appendChild(trashButton);
		//append the division to list
		todoList.appendChild(todoDiv);
	});
}

function removeLocalStorageTodos(todo)
{
	let todos; //declaring an array to store the todo
	if(localStorage.getItem("todos")===null)
	{
		todos=[]; // if the storage is empty then we create an array
	}
	else{
		todos=JSON.parse(localStorage.getItem("todos")); //else if we already have something in storage we parse it and put it an array
	}
	
	// we are going to remove the positions of the todo item we are clicking on
	const todoIndex= todo.children[0].innerText; // to get the name of the todo
	todos.splice(todos.indexOf(todoIndex),1); //The splice() method adds/removes items to/from an array, and returns the removed item(s).
	// the first attribute in the splice function represents the index of the item you want to remove and the 2nd atribute tells how many attributes to be removed
	localStorage.setItem("todos",JSON.stringify(todos)); //updating the local storage after removing the particular item

}

