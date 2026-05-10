async function trytry() {
  return await Promise.resolve(1)
};

(async () => {
  const r = await trytry()
  console.log(r)
})();