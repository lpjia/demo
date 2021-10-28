const listener = Deno.listen({ port: 9080 });
console.log("listening on 0.0.0.0:9080");
for await (const conn of listener) {
  Deno.copy(conn, conn);
}
