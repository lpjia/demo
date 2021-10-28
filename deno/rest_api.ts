import { Application } from "https://deno.land/x/oak@v8.0.0/mod.ts";
import { green, yellow } from "https://deno.land/std@0.53.0/fmt/colors.ts";
import notFound from "./middlewares/notFound.ts";
import logger from "./middlewares/logger.ts";

// routes
import todoRouter from "./routes/todo.ts";

const app = new Application();
const port: number = 9080;

/*
const router = new Router();
router.get("/", ({ response }: { response: any }) => {
  response.body = {
    message: "hello world",
  };
});

app.use(router.routes());
app.use(router.allowedMethods());*/

// 以下代码的编写顺序很重要
app.use(logger.logger);
app.use(logger.responseTime);

app.use(todoRouter.routes());
app.use(todoRouter.allowedMethods());

// 404 页面
app.use(notFound);

app.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;

  console.log(`${yellow("listening on:")} ${green(url)}`);
});

await app.listen({ port });
