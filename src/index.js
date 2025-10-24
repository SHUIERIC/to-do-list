import { Item } from "./todo-item";
import { Project } from "./todo-project";
import { MainDisplay, SideDisplay, ItemRender } from "./display";
import { saveProjects, loadProjects } from "./storage";
import './styles.css';

loadProjects()

if (Project.allProject.length === 0) {
const todo1 = new Item('Finish report', 'Complete report by Friday', '2025-10-28', 'High');
const todo2 = new Item('Email client', 'Send update email', '2025-10-26', 'Medium');
const todo3 = new Item("Buy groceries","Pick up milk, eggs, and vegetables from the supermarket.","2025-10-24","Medium");
const todo4 = new Item("Workout session","Go for a 45-minute run or do a home workout routine.","2025-10-23","Low");
const todo5 = new Item("Prepare presentation","Finish slides for Monday’s team meeting and rehearse once.","2025-10-27","High");
const todo6 = new Item("Finish Portfolio Website", "Complete the personal portfolio site and deploy it online.", "2025-11-01", "High");
const todo7 = new Item("Grocery Shopping", "Buy groceries for the week including fresh produce and dairy.", "2025-10-25", "Medium");
const todo8 = new Item("Read 'Clean Code'", "Read and summarize chapters 5-8 of 'Clean Code' book.", "2025-10-30", "Low");

const defaultProject = new Project ('To do List')
const project1 = new Project ("Work")
const project2 = new Project("Home")


project2.addItem(todo1)
project2.addItem(todo6)
project2.addItem(todo8)
project1.addItem(todo7)
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

saveProjects()
}

const itemRender = new ItemRender(document.querySelector(".main"));
const mainDisplay = new MainDisplay(document.querySelector(".main"), itemRender);
const sideDisplay = new SideDisplay(document.querySelector(".sideContent"), mainDisplay);

loadProjects()
sideDisplay.sideRenderProject(Project.allProject)
mainDisplay.mainRenderProject(Project.allProject[0])
