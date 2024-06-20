const fs = require('fs');
const uuid = require('uuid')

class DataBase {
  constructor(path) {
    this.path = path;
    this.loadData();
  }

  loadData() {
    try {
      const saveData = fs.readFileSync(this.path, 'utf8');
      this.data = JSON.parse(saveData);
    } catch (e) {
      this.data = {};
    }
  }

  saveData() {
    const saveData = JSON.stringify(this.data);
    fs.writeFileSync(this.path, saveData, 'utf8');
  }

  getTicket(id) {
    const ticket = this.data[`${id}`];
    return {...ticket.data, description: ticket.description};
  }

  getTicketList() {
    return Object.values(this.data).map(x => x.data)
  }

  createNewTicket(data) {
    data.id = uuid.v4();
    data.created = new Date().toISOString();
    const {name, description, created, status, id} = data;
    this.data[data.id] = {data: {id, name, created, status}, description};
    this.saveData()
    return data;
  }

  updateTicket(data) {
    const {name, description, created, status, id} = data;
    this.data[data.id] = {data: {id, name, created, status}, description};
    this.saveData();
    return data;
  }

  removeTicket(id) {
    if (!this.data[id]) return false
    delete this.data[id];
    this.saveData();
    return true
  }
}

module.exports = DataBase;

