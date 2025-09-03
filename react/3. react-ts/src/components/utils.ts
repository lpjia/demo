export function createConnection() {
  // 真正的实现实际上会连接到服务器
  return {
    connect() {
      console.log('✅ 连接中……');
    },
    disconnect() {
      console.log('❌ 连接断开。');
    }
  };
}