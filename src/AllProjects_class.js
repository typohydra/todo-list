import OneProject from './OneProject_class';

export default class AllProjects {
  constructor() {
    this.projects = [];
  }

  getProjects() { return this.projects; }

  getProjectByName(name) {
    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i].getName() === name) {
        return this.projects[i];
      }
    }
    return null;
  }

  addProject(name) {
    const projectName = name.trim();
    if (projectName.length === 0) throw new Error("Project Name Can't Be Empty.");
    this.projects.forEach((project) => {
      if (project.getName() === projectName) throw new Error('Project Name Already Used.');
    });
    this.projects.push(new OneProject(projectName));
  }

  removeProject(name) {
    if (name.length === 0) return;
    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i].getName() === name) {
        this.projects.splice(i, 1);
        return;
      }
    }
  }
}
