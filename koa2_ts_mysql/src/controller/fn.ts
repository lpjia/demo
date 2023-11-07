import { PassThrough } from "stream";

export const sendMessage = async (stream: PassThrough) => {
  const data = [
    '现在科学技术的发展速度叫人惊叹',
    '同样在数码相机的技术创新上',
    '随着数码相机越来越普及',
    '数码相机现已成为大家生活中不可缺少的电子产品',
    '而正是因为这样，技术的创新也显得尤为重要',
  ];

  // 循环上面数组: 推送数据、休眠 2 秒
  for (const value of data) {
    stream.write(`data: ${value}\n\n`); // 写入数据(推送数据)
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  // 结束流
  stream.end();
};