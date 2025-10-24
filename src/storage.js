import { Project } from "./todo-project";
import { Item, Note, Checklist} from "./todo-item";       



function saveProjects () {
    const dataToSave = Project.allProject.map(project => ({
        name: project.name,
        items: project.items.map(item => ({
            title: item.title,
            description: item.description,
            dueDate: item.dueDate,
            priority: item.priority,
            done: item.done,
            notes: item.notes.list,       
            checklist: item.checklist.checklists
        }))
    }));
    
    localStorage.setItem("projects", JSON.stringify(dataToSave))
}

function loadProjects () {
    const saved = JSON.parse(localStorage.getItem("projects"))
    if (saved) {
    Project.allProject = saved.map(p => {
        const proj = new Project(p.name);   
        p.items.forEach(it => {
            const item = new Item(it.title, it.description, it.dueDate, it.priority);
            item.done = it.done;

            item.notes = new Note()
            it.notes.forEach(note => item.notes.addNote(note));

            item.checklist = new Checklist();
            it.checklist?.forEach(task => item.checklist.addTask(task.task));

            proj.addItem(item);
        })

        return proj
    })}
    }

export {saveProjects, loadProjects}