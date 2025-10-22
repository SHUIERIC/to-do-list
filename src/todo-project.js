import { Item } from "./todo-item";

class Project {
    constructor (name) {
        this.name = name;
        this.project = [];
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