import { test1_backend } from "../../declarations/test1_backend";

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("button");

  const name = document.getElementById("name").value.toString();

  button.setAttribute("disabled", true);

  // Interact with foo actor, calling the greet method
  const greeting = await test1_backend.greet(name);

  button.removeAttribute("disabled");

  let greetingArea = document.getElementsByClassName("greetingArea")[0];
  let newElement = document.createElement("p");
  newElement.innerText = greeting;
  greetingArea.appendChild(newElement);

  let deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", function () {
    // Remove the greeting from the screen
    greetingArea.removeChild(newElement);

    // Remove the greeting from Local Storage
    let updatedGreetings = JSON.parse(localStorage.getItem('greetings')) || [];
    updatedGreetings.splice(index, 1);
    localStorage.setItem('greetings', JSON.stringify(updatedGreetings));
  });

  newElement.appendChild(deleteButton);
  
  let greetings = JSON.parse(localStorage.getItem('greetings')) || [];
  greetings.push(greeting);
  localStorage.setItem('greetings', JSON.stringify(greetings));

  let index = greetings.length - 1; // Get the last index of the array

  return false;
});

window.onload = function () {
  let storedGreetings = JSON.parse(localStorage.getItem('greetings')) || [];
  let greetingArea = document.getElementsByClassName("greetingArea")[0];
  storedGreetings.forEach((greeting, index) => {
    let newElement = document.createElement("p");
    newElement.innerText = greeting;

    let deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", function () {
      // Remove the greeting from the screen
      greetingArea.removeChild(newElement);

      // Remove the greeting from Local Storage
      let updatedGreetings = JSON.parse(localStorage.getItem('greetings')) || [];
      updatedGreetings.splice(index, 1);
      localStorage.setItem('greetings', JSON.stringify(updatedGreetings));
    });

    newElement.appendChild(deleteButton);
    greetingArea.appendChild(newElement);
  });
}