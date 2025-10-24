import { Project } from "./todo-project";
import { Item } from "./todo-item";
import { saveProjects, loadProjects } from "./storage";


class ItemRender {
    constructor(mainContainer) {
        this.mainContainer = mainContainer
    }

    // render individual item on the main page
    mainRenderItem (item, project) {
            this.mainContainer.innerHTML = "";

            const card = document.createElement("div");
            card.classList.add("item-card");

            const title = document.createElement("h3");
            title.textContent = item.title;
            card.appendChild(title);

            const desc = document.createElement("p");
            desc.textContent = item.description;
            card.appendChild(desc);

            const due = document.createElement("p");
            due.textContent = `Due: ${item.dueDate}`;
            card.appendChild(due);

            const priority = document.createElement("p");
            priority.textContent = `Priority: ${item.priority}`;
            card.appendChild(priority);

            const done = document.createElement("p");
            done.textContent = `Done: ${item.done ? "✅" : "❌"}`;
            card.appendChild(done);

                const notesDiv = document.createElement("div");
                notesDiv.classList.add("notes");
                const notesTitle = document.createElement("strong");
                notesTitle.textContent = "Notes:";
                const notesAddBtn = document.createElement("button")
                notesAddBtn.textContent= "Add"
                notesDiv.appendChild(notesTitle);
                notesDiv.appendChild(notesAddBtn)

            if (item.notes) {
                const notesList = document.createElement("ul");
                item.notes.list.forEach((note, index) => {
                    const li = document.createElement("li");
                    
                    const label = document.createElement("span");
                    label.textContent = note;

                    const noteDelBtn = document.createElement("button");
                    noteDelBtn.textContent = "Delete";

                    noteDelBtn.addEventListener("click", () => {
                    item.notes.removeNote(index); 
                    saveProjects()
                    this.mainRenderItem(item);
                    });

                    li.appendChild(label);
                    li.appendChild(noteDelBtn);
                    notesList.appendChild(li);
                });
                notesDiv.appendChild(notesList);
                card.appendChild(notesDiv);
            }

                const checklistDiv = document.createElement("div");
                checklistDiv.classList.add("checklist");
                const checklistTitle = document.createElement("strong");
                checklistTitle.textContent = "Checklist:";
                const checkAddBtn = document.createElement("button")
                checkAddBtn.textContent= "Add"
                
                checklistDiv.appendChild(checklistTitle);
                checklistDiv.appendChild(checkAddBtn);
                

            if (item.checklist) {
                const checklistList = document.createElement("ul");
                item.checklist.checklists.forEach((task, index) => {
                    const li = document.createElement("li");

                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.checked = false; 

                    const label = document.createElement("span");
                    label.textContent = task.task;

                    const checkDelBtn = document.createElement("button")
                    checkDelBtn.textContent= "Delete"

                    checkDelBtn.addEventListener("click", ()=> {
                        item.checklist.removeTask(index);
                        saveProjects()
                        this.mainRenderItem(item);
                    })

                    
                    li.appendChild(checkbox);
                    li.appendChild(label);
                    li.appendChild(checkDelBtn)
                    checklistList.appendChild(li);
                });
                checklistDiv.appendChild(checklistList);
                card.appendChild(checklistDiv);
            }


        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        checkAddBtn.addEventListener("click", ()=> this.editChecklist(item.checklist, item))
        notesAddBtn.addEventListener("click", ()=> this.editNote(item.notes, item))
        
        editBtn.addEventListener("click", () => this.openEditDialog(item));
        
        card.appendChild(editBtn); 

        this.mainContainer.appendChild(card);

        }

    openEditDialog(item) {
        const dialog = document.getElementById("edit-dialog");

        dialog.querySelector('input[name="title"]').value = item.title;
        dialog.querySelector('textarea[name="description"]').value = item.description;
        dialog.querySelector('select[name="priority"]').value = item.priority;
        dialog.querySelector('input[name="done"]').checked = item.done;

        // Show dialog
        dialog.showModal();

        // Handle save
        const saveBtn = dialog.querySelector("#save-btn");
        saveBtn.onclick = () => {
            const updatedData = {
                title: dialog.querySelector('input[name="title"]').value,
                description: dialog.querySelector('textarea[name="description"]').value,
                dueDate: dialog.querySelector('input[name="dueDate"]').value,
                priority: dialog.querySelector('select[name="priority"]').value,
                done: dialog.querySelector('input[name="done"]').checked
            };

            // Update the item using its own edit() method
            item.edit(updatedData);

            this.mainRenderItem(item);

            dialog.close();
        };

        const cancelBtn = dialog.querySelector("#cancel-btn");
        cancelBtn.addEventListener("click", () => {
        dialog.close(); 
        });
        }
    
    editChecklist (checklist, item) {
        const checkdialog = document.getElementById("add-checklist");

        checkdialog.showModal()

        const saveCheck = document.getElementById("save-check")
        saveCheck.onclick = () => {
            const input = document.querySelector('input[name=checklist]')
            const newCheck =input.value.trim()
           
            item.checklist.addTask(newCheck);
            saveProjects()
            this.mainRenderItem(item)
            input.value =""
            checkdialog.close()
        }
    }

    deleteChecklist (checklist, item) {
        const checkDel = document.querySelector(".checkDel")
        checkDel.onclick = () => {
            item.checklist.removeTask (-1)
        }
    }

    editNote (note, item) {
        const noteDialog = document.getElementById("add-note");

        noteDialog.showModal()

        const saveNote = document.getElementById("save-note")
        saveNote.onclick = () => {
            const input = document.querySelector('input[name=note]')
            const newNote =input.value.trim()
           
            item.notes.addNote(newNote);
            saveProjects()
            this.mainRenderItem(item)
            input.value =""
            noteDialog.close()
        }
    }
    }

class MainDisplay {
    constructor(mainContainer, itemRender) {
        this.mainContainer = mainContainer
        this.projectTitle = document.querySelector(".projectTitle")
        this.delBtn = document.querySelector(".delBtn")
        this.itemRender = itemRender
    }

    mainRenderProject (project) {
        this.projectTitle.textContent = project.name
        
        this.mainContainer.innerHTML = "";

        project.items.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("todo-card");

        const titleDiv = document.createElement("div");
        titleDiv.textContent = item.title;

        const dueDiv = document.createElement("div");
        dueDiv.textContent = item.dueDate;

        const doneDiv = document.createElement("div");
        doneDiv.textContent = item.done ? "✅" : "❌";

        const detailBtn = document.createElement("button");
        detailBtn.textContent = "Detail";
        detailBtn.addEventListener("click", () => {       
            this.itemRender.mainRenderItem(item, project);
        });

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => {
            project.removeItem(item);
            saveProjects()       
            this.mainRenderProject(project);
        })

        card.appendChild(titleDiv);
        card.appendChild(dueDiv);
        card.appendChild(doneDiv);
        card.appendChild(detailBtn)
        card.appendChild(delBtn);
        
        this.mainContainer.appendChild(card);
        });

        const addItemBtn = document.createElement("button");
        addItemBtn.textContent = "Add Todo Item";
        addItemBtn.addEventListener("click", () => this.addItemDialog(project))
        this.mainContainer.appendChild(addItemBtn)
    }

    addItemDialog (project) {
        const itemialog = document.getElementById("add-item");

        itemialog.showModal()

        const saveItem = document.getElementById("save-item")

        saveItem.onclick = () => {
            const newItem = {
                title: itemialog.querySelector('input[name="title"]').value,
                description: itemialog.querySelector('textarea[name="description"]').value,
                dueDate: itemialog.querySelector('input[name="dueDate"]').value,
                priority: itemialog.querySelector('select[name="priority"]').value,
                done: itemialog.querySelector('input[name="done"]').checked
            }
           
            const newTodo = new Item (newItem.title, newItem.description, newItem.dueDate, newItem.priority);
            project.addItem(newTodo)
            saveProjects()

            itemialog.querySelector('input[name="title"]').value = "";
            itemialog.querySelector('textarea[name="description"]').value = "";
            itemialog.querySelector('select[name="priority"]').value = "Medium";
            itemialog.querySelector('input[name="done"]').checked = false;

            itemialog.close()

            this.mainRenderProject(project)
        }
        }
}

class SideDisplay {
    constructor (containerContent, maindisplay) {
        this.container = containerContent
        this.maindisplay = maindisplay
    }

    sideRenderProject (projects) {
        this.container.innerHTML = '';

        projects.forEach ( (project) => {
            const projectContainer = document.createElement("div");
            projectContainer.classList.add("project")

            const projectBtn = document.createElement("button")
            projectBtn.textContent=`${project.name}`

            projectBtn.addEventListener("click", () => {
                this.maindisplay.mainRenderProject (project)
            })

            const delProBtn = document.createElement("button");
            delProBtn.textContent = "Delete Project";
            delProBtn.addEventListener("click", () => {
            project.deleteProject(project); 
            saveProjects() 
            this.sideRenderProject(Project.allProject);
            })
                
            this.container.appendChild(projectContainer)
            projectContainer.appendChild(projectBtn)
            projectContainer.appendChild(delProBtn)
        })

        const addProBtn = document.createElement("button");
        addProBtn.textContent = "Add Project";
        addProBtn.addEventListener("click", () => this.addProDialog())
        this.container.appendChild(addProBtn)

    }

     addProDialog () {
        const proDialog = document.getElementById("add-project");

        proDialog.showModal()

        const savePro = document.getElementById("save-project")
        savePro.onclick = () => {
            const input = document.querySelector('input[name=project]')
            const proName =input.value.trim()
            if (proName === "") return;
           
            const newProject = new Project(proName);
            saveProjects()
            this.sideRenderProject(Project.allProject);
            input.value =""
            proDialog.close()
        }
        }
}


export {SideDisplay, MainDisplay, ItemRender}