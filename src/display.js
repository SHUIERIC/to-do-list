class SideDisplay {
    constructor (containerContent) {
        this.container = containerContent
    }

    sideRenderProject (projects) {
        this.container.innerHTML = '';

        projects.forEach ( (project) => {
            const projectContainer = document.createElement("div");
            projectContainer.classList.add("project")

            projectContainer.innerHTML= `
            <button> ${project.name}</button>
            `
            this.container.appendChild(projectContainer)
        })
    }
}

class MainDisplay {
    constructor(mainContainer) {
        this.mainContainer = mainContainer // takes .main from html
        this.projectTitle = document.querySelector(".projectTitle")
    }

    mainRenderProject (project) {
        this.projectTitle.textContent = project.name;

        this.mainContainer.innerHTML = "";

        project.items.forEach (item => {
            const card = document.createElement("div");
            card.classList.add("todo-card");
            card.innerHTML=`
            <div>${item.title}</div>
            <div>${item.dueDate}</div>
            <div>${item.done}</div>
            `
            this.mainContainer.appendChild(card)
        })
    }
}

class ItemRedner {
    constructor(mainContainer) {
        this.mainContainer = mainContainer
    }

    // render individual item on the main page
    mainRenderItem (item) {
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

            if (item.notes) {
                const notesDiv = document.createElement("div");
                notesDiv.classList.add("notes");
                const notesTitle = document.createElement("strong");
                notesTitle.textContent = "Notes:";
                const notesAddBtn = document.createElement("button")
                notesAddBtn.textContent= "Add"
                notesDiv.appendChild(notesTitle);
                notesDiv.appendChild(notesAddBtn)

                const notesList = document.createElement("ul");
                item.notes.list.forEach(note => {
                    const li = document.createElement("li");
                    li.innerHTML = `${note} <button>Delete</button>`;
                    notesList.appendChild(li);
                });
                notesDiv.appendChild(notesList);
                card.appendChild(notesDiv);
            }

            if (item.checklist) {
                const checklistDiv = document.createElement("div");
                checklistDiv.classList.add("checklist");
                const checklistTitle = document.createElement("strong");
                checklistTitle.textContent = "Checklist:";
                const checkAddBtn = document.createElement("button")
                checkAddBtn.textContent= "Add"
                checklistDiv.appendChild(checklistTitle);
                checklistDiv.appendChild(checkAddBtn);

                const checklistList = document.createElement("ul");
                item.checklist.checklists.forEach(task => {
                    const li = document.createElement("li");

                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.checked = false; 

                    const label = document.createElement("span");
                    label.textContent = task.task;

                    const checkDelBtn = document.createElement("button")
                    checkDelBtn.textContent= "Delete"

                    li.appendChild(checkbox);
                    li.appendChild(label);
                    label.appendChild(checkDelBtn)
                    checklistList.appendChild(li);
                });
                checklistDiv.appendChild(checklistList);
                card.appendChild(checklistDiv);
            }


        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        editBtn.addEventListener("click", () => this.openEditDialog(item));
        delBtn.addEventListener("click", () => {item.delete(project); this.mainRenderProject(project)});
        card.appendChild(editBtn); 
        card.appendChild(delBtn)

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
    }

export {SideDisplay, MainDisplay, ItemRedner}