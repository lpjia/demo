import { useEffect } from 'react';
import { createConnection } from './utils';

export default function ChatRoom() {
  useEffect(() => {
    const connection = createConnection()
    connection.connect()

    /* 清理（cleanup）函数 */
    return () => {
      connection.disconnect()
    }
  }, [])
  return <h1>欢迎来到聊天室！</h1>
}