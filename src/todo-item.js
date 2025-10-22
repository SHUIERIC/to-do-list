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
        this.notes = new Note()
        this.checklist = new Checklist ()
    }

}

class Note {
    constructor (note) {
        this.note = note;
        this.notes = [] 
    }

    addNote (note) {
        this.notes.push(note)
    }

    removeNote (index) {
        this.notes.splice(index, 1)
    }

    getNote () {
        return this.notes
    }
}

class Checklist {
    constructor () {
        this.checklist = []
    }

    addTask (task) {
        this.checklist.push({task: task, done: false})
    }

    removeTask (index) {
        this.checklist.splice(index, 1)
    }

    doneTask (index) {
        if (this.checklist[index]) {
            this.checklist[index].done ? flase : true;
        }
    }

    getTask () {
        return this.checklist
    }

}


export {Item}


  