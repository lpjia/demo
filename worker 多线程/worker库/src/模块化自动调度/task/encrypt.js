export function encrypt(data) {
  const jsonStr = JSON.stringify(data); // 将数据（可能含中文）序列化为 JSON 字符串
  const utf8Buffer = Buffer.from(jsonStr, 'utf8'); // 用 Buffer 将 JSON 字符串转为 UTF-8 编码（关键：处理中文）
  return utf8Buffer.toString('base64'); // 将 UTF-8 Buffer 转为 Base64 字符串（支持中文）

  // return btoa(JSON.stringify(data)); // Base64 加密（示例用）
}