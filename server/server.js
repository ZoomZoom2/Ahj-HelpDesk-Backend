const Koa = require("koa");
const Router = require("koa-router");
const cors = require('@koa/cors');

const koaBody = require('koa-body');

const app = new Koa();
app.use(cors());
app.use(koaBody());

const router = new Router()

require("./ticket")(router);

app.use(router.routes()).use(router.allowedMethods())


const port = 7070;
app.listen(port, () => {
  console.log('Server running on port 7070');
});
