const Database = require("./dataBase");

const db = new Database("./saveData.json");

function getTicket(ctx) {
  const id = ctx.params.id;
  const ticket = db.getTicket(id);
  if (!ticket) {
    ctx.response.status = 404;
    ctx.response.body = 'Ticket is not found';
    return;
  }
  ctx.response.body = JSON.stringify(ticket);
}

function getTicketList(ctx) {
  const tickets = db.getTicketList();
  if (!tickets) {
    ctx.response.status = 404;
    ctx.response.body = 'Tickets is not found';
    return;
  }
  ctx.response.body = JSON.stringify(tickets);
}

function createNewTicket(ctx) {

  const data = ctx.request.body;
  const ticket = db.createNewTicket(data)

  if (!ticket) {
    ctx.response.status = 404;
    ctx.response.body = 'Ticket is not create';
    return;
  }

  ctx.response.body = JSON.stringify(ticket);
}

function updateTicket(ctx) {
  const data = ctx.request.body;
  const ticket = db.updateTicket(data);
  if (!ticket) {
    ctx.response.status = 404;
    ctx.response.body = 'Ticket is not update';
    return;
  }

  ctx.response.body = JSON.stringify(ticket);
}

function deleteTicket(ctx) {
  const id = ctx.params.id;
  const ticket = db.removeTicket(id);
  if (!ticket) {
    ctx.response.status = 404;
    ctx.response.body = 'Ticket is not delete';
    return;
  }
  ctx.response.body = ticket;
}


module.exports = function (router) {
  router.get('/api/tickets/:id', getTicket);
  router.get('/api/tickets', getTicketList);
  router.post('/api/tickets', createNewTicket);
  router.put('/api/tickets/:id', updateTicket);
  router.delete('/api/tickets/:id', deleteTicket);
}
