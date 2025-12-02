export function compute(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        sum: data.reduce((a, b) => a + b, 0),
        average: data.reduce((a, b) => a + b, 0) / data.length
      })
    }, 3000);
  });
}