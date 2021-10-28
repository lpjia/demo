import { serve } from "https://deno.land/std@0.79.0/http/server.ts";
let port: number = 9080;
const s = serve({ port });
console.log("http://localhost:" + port + "/");
for await (const req of s) {
  req.respond({ body: "Hello World\n 3" });
  // req.respond({ file: './index.html' }); // 报错, 还需要研究怎么显示本地静态文件
}
