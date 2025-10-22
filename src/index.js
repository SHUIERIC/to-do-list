import { Item } from "./todo-item";
import { Project } from "./todo-project";
import { Display } from "./display";

const sideBar = document.querySelector(".sidebar")
const mainPage = document.querySelector(".main")

const display = new Display (mainPage)
const todo1 = new Item('Finish report', 'Complete report by Friday', '2025-10-28', 'High');
const todo2 = new Item('Email client', 'Send update email', '2025-10-26', 'Medium');

const project1 = new Project ("Work")
const project2 = new Project("Home")

project2.addItem(todo1)
project1.addItem(todo2)
todo2.notes.addNote("his email is ")
todo1.checklist.addTask("find data")

console.log (project1.getItem())
console.log (project2.getItem())
console.log (Project.allProject)


display.renderProject(Project.allProject)
