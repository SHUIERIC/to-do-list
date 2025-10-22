import { Item } from "./todo-item";
import { Project } from "./todo-project";
import { MainDisplay, SideDisplay, ItemRedner } from "./display";
import './styles.css';

const sideContent = document.querySelector(".sideContent")
const main = document.querySelector(".main")
const item = document.querySelector(".itemContainer")
const sideDisplay = new SideDisplay (sideContent)
const mainDisplay = new MainDisplay (main)
const mainItemDisplay = new ItemRedner (item)

const todo1 = new Item('Finish report', 'Complete report by Friday', '2025-10-28', 'High');
const todo2 = new Item('Email client', 'Send update email', '2025-10-26', 'Medium');
const todo3 = new Item("Buy groceries","Pick up milk, eggs, and vegetables from the supermarket.","2025-10-24","Medium");
const todo4 = new Item("Workout session","Go for a 45-minute run or do a home workout routine.","2025-10-23","Low");
const todo5 = new Item("Prepare presentation","Finish slides for Monday’s team meeting and rehearse once.","2025-10-27","High");

const defaultProject = new Project ('To do List')
const project1 = new Project ("Work")
const project2 = new Project("Home")



project2.addItem(todo1)
project1.addItem(todo2)
defaultProject.addItem(todo3)
defaultProject.addItem(todo4)
defaultProject.addItem(todo5)

todo3.notes.addNote("his email is ")
todo3.checklist.addTask("find data")
todo3.checklist.doneTask(0)

console.log (project1.getItem())
console.log (project2.getItem())
console.log (defaultProject.getItem())
console.log (Project.allProject)


sideDisplay.sideRenderProject(Project.allProject)
mainItemDisplay.mainRenderItem(todo3)
