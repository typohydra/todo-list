export default class Note {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.checked = false;
    this.dueDate = '';
  }

  getName() { return this.name; }

  setName(name) { this.name = name; }

  getDescription() { return this.description; }

  setDescrition(desc) { this.description = desc; }

  getChecked() { return this.checked; }

  setChecked() { this.checked = !this.checked; }
}
