import { getDepChains } from '../getDepChain.js';

const globalNodeMap = {
  A: { name: 'A', effects: ['B', 'C'] },
  B: { name: 'B', effects: ['C'] },
  C: { name: 'C', effects: ['D'] },
  D: { name: 'D', effects: ['B', 'E'] }, // recursive dependency
  E: { name: 'E', effects: [] },
};
const nodeA = globalNodeMap['A'];

const chains = getDepChains(nodeA, globalNodeMap);
console.log(chains); // 输出所有依赖链
