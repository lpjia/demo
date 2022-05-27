/**
 * 常见的对象里包一层数组
 * 怎么写接口
 */
interface User {
  name: string;
  age: number;
  open: boolean;
  lessons: {
    title: string;
  }[];
}