export function parse(data) {
  const parsed = JSON.parse(data);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        original: parsed,
        multiplied: parsed.num * 10
      })
    }, 2000);
  });
}