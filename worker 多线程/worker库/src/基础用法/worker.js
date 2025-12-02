export default (param) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(param)
    }, 3000);
  });
}