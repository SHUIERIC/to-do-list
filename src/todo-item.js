import {format, parse, compareAsc, isBefore, isAfter, isToday, isEqual} from 'date-fns';

// format(new Date(), 'dd/MM/yyyy'); 

// const parsedDate = parse(input, 'dd/MM/yyyy')

// const date1 = new Date(2025, 9, 22); // Oct 22, 2025
//const date2 = new Date(2025, 9, 25); // Oct 25, 2025
//console.log(compareAsc(date1, date2)); // -1 (date1 is before date2)
//console.log(compareAsc(date2, date1)); // 1  (date2 is after date1)
//console.log(compareAsc(date1, date1)); // 0  (dates are equal)

// isBefore(dueDate, dateToCompare)
//isAfter(date, dateToCompare)
// isToday(date)
// isEqual(dateLeft, dateRight)

// Project, item, checklist 


class Item {
    constructor (title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority
        this.done = false
        this.notes = new Note()
        this.checklist = new Checklist ()
    }
    
    changePriority (newPriority) {
        this.priority= newPriority
    }

    changeDone () {
        this.done = !this.done
    }

    edit(updatedData) {
        if (updatedData.title !== undefined) this.title = updatedData.title;
        if (updatedData.description !== undefined) this.description = updatedData.description;
        if (updatedData.priority !== undefined) this.priority = updatedData.priority;
        if (updatedData.done !== undefined) this.done = updatedData.done;

        if (updatedData.dueDate) {
            const parsedDate =parse(updatedData.dueDate, 'yyyy-MM-dd', new Date())
            this.dueDate = format(parsedDate, 'yyyy-MM-dd')
        }
    }

    delete(project) {
        project.removeItem(this)
    }
        
}

class Note {
    constructor (note) {
        this.list = [] 
    }

    addNote (note) {
        this.list.push(note)
    }

    removeNote (index) {
        this.list.splice(index, 1)
    }

    getNote () {
        return this.list
    }
}

class Checklist {
    constructor () {
        this.checklists = []
    }

    addTask (task) {
        this.checklists.push({task: task, done: false})
    }

    removeTask (index) {
        this.checklists.splice(index, 1)
    }

    doneTask (index) {
        if (this.checklists[index]) {
            this.checklists[index].done = !this.checklists[index].done;
        }
    }

    getTask () {
        return this.checklist
    }

}


export {Item}


  