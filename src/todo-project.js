class Project {
    static allProject =[];

    constructor (name) {
        this.name = name;
        this.project = [];
        Project.allProject.push(this)
    }


    addItem (item) {
        this.project.push(item)
    } 

    removeItem (removeItem) {
        this.project.filter(item => item !== removeItem)
    }

    getItem () {
        return this.project
    }
}

export {Project}