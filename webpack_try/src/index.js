import { a1 } from "@/module/a.js";

console.log(a1)

const requireContext = import.meta.webpackContext('./module', {
  recursive: true,
  regExp: /\.js$/
});

console.log(requireContext)
console.log(requireContext.keys())
const requireAll = (rc) => {
  return rc.keys().map(rc)
}
console.log(requireAll(requireContext))
console.log(requireAll(requireContext)[0].a1)


function component() {
  const element = document.createElement('div');
  element.textContent = 'hello webpack'
  return element;
}
document.body.appendChild(component());