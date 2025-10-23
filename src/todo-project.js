class Project {
    static allProject =[];

    constructor (name) {
        this.name = name;
        this.items = [];
        Project.allProject.push(this)
    }


    addItem (item) {
        this.items.push(item)
    } 

    removeItem (removeItem) {
        const index = this.items.indexOf(removeItem);
        if (index !== -1) {
        this.items.splice(index, 1);
    }
    }

    getItem () {
        return this.items
    }

    deleteProject (delProject) {
         const index = Project.allProject.indexOf(delProject);
        if (index !== -1) {
        Project.allProject.splice(index, 1);
    }}

    addProject (name) {
        const project = new Project(name)
    }
}

export {Project}