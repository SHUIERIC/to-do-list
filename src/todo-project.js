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
        this.items.filter(item => item !== removeItem)
    }

    getItem () {
        return this.items
    }
}

export {Project}