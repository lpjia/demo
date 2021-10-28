import { Application } from "https://deno.land/x/oak@v8.0.0/mod.ts";
import { green, yellow } from "https://deno.land/std@0.53.0/fmt/colors.ts";

// routes
import todoRouter from "./routes/todo.ts";
import notFound from "./middlewares/notFound.ts";
import logger from "./middlewares/logger.ts";

const app = new Application();
const port: number = 9080;

// 日志
app.use(logger.logger);
app.use(logger.responseTime);

app.use(todoRouter.routes());
app.use(todoRouter.allowedMethods());

// 404
app.use(notFound);

app.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "http://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  console.log(`${yellow("Listenning on:")} ${green(url)}`);
});
await app.listen({ port });
