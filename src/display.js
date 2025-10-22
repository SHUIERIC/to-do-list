class Display {
    constructor (containerContent) {
        this.container = containerContent
    }

    renderProject (projects) {
        this.container.innerHTML = '';

        projects.forEach ( (project) => {
            const projectContainer = document.createElement("div");
            projectContainer.classList.add("project")

            projectContainer.innerHTML= `
            <div> ${project.name}</div>
            `
            this.container.appendChild(projectContainer)
        })
    }
}

export {Display}