import MyVideo from "./vdo.js";
import { createFakeSingleton } from './singleton.js'
import { createSingleton, singleton } from './singleton.js'

console.log(
  createFakeSingleton(MyVideo)(1, 2),
  createFakeSingleton(MyVideo)(1, 2) === createFakeSingleton(MyVideo)(1, 2),
  createFakeSingleton(MyVideo)(1, 2) === createFakeSingleton(MyVideo)(3, 4),
  // 这里还是没有实现单例, 但是思路可以学习
)

console.log(
  createSingleton(MyVideo)(10, 20),
  // 实现单例
  createSingleton(MyVideo)(1, 2) === createSingleton(MyVideo)(1, 2),
  createSingleton(MyVideo)(5, 6) === createSingleton(MyVideo)(3, 4),
  singleton
  // 拿到的都是这一个实例, 不会因为多次调用就会变
)