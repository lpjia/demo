import Todo from "../interfaces/Todo.ts";

let url: string = "http://rap2api.taobao.org/app/mock/288967/api/random";
let response: any = await fetch(url);

if (!response.ok) throw new Error("response failed");
let { data }: { data: any } = await response.json();

let todos: Todo[] = data;

export default todos;
