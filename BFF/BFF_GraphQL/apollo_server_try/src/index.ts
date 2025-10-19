import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

/* ts的type定义 */
type Article = {
  title: string
  author: string
}


/* 使用模板字符串
  #graphql 加graphql为了编辑器高亮其语法
*/
/* 定义数据的结构 */
const typeDefs = `#graphql
  type Book { # 注意和ts的type的区别, ts用=
    title: String # 数据类型首字母大写
    author: String
  }

  type Query {
    books: [Book] # 定义数组用[Arr], ts用Arr[]
  }
`

/* 数据 */
const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];


interface Resp {
  data: {
    list: Article[];
    count: number;
  };
  code: number;
  msg: string;
}
const response = await fetch('http://localhost:7100/api/article/list');
const resp = (response.ok && await response.json()) as Resp
const data = resp.data.list


/* 定义解析器 */
const resolvers = {
  Query: {
    books: () => data,
  },
};


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 7020 },
});
console.log(`🚀  Server ready at: ${url}`);