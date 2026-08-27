export function getProduct(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: '哈根达斯',
        price: 299,
        services: ['包邮', '退换货']
      });
    }, 1000);
  });
}
