import { Application, Session } from "./deps.js";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { staticMiddleware } from "./middlewares/staticMiddleware.js";
import { router } from "./routes/routes.js";


const app = new Application();

app.use(Session.initMiddleware());
app.use(renderMiddleware);
app.use(staticMiddleware);
app.use(router.routes());

await app.listen({ port: 7777 });