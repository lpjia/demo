import fs from 'fs';
export const tools = {
  sum({ a, b }) {
    return {
      content: [
        {
          type: 'text',
          text: `两数求和结果：${a + b}`,
        },
      ],
    };
  },
  createFile({ filename, content }) {
    try {
      fs.writeFileSync(filename, content);
      return {
        content: [
          {
            type: 'text',
            text: `文件创建成功！`,
          },
        ],
      };
    } catch (err) {
      return {
        content: [
          {
            type: 'text',
            text: err.message || '文件创建失败！',
          },
        ],
      };
    }
  },
};

export default {
  initialize() {
    return {
      protocolVersion: '2024-11-05',
      capabilities: {
        logging: {},
        prompts: {
          listChanged: true,
        },
        resources: {
          subscribe: true,
          listChanged: true,
        },
        tools: {
          listChanged: true,
        },
      },
      serverInfo: {
        // 服务端信息
        name: 'ExampleServer',
        title: 'Example Server Display Name',
        version: '1.0.0',
      },
      instructions: 'Optional instructions for the client',
    };
  },
  'tools/list'() {
    return {
      tools: [
        {
          name: 'sum',
          title: '两数求和',
          description: '得到两个数的和',
          inputSchema: {
            type: 'object',
            properties: {
              a: {
                type: 'number',
                description: '第一个数',
              },
              b: {
                type: 'number',
                description: '第二个数',
              },
            },
            required: ['a', 'b'],
          },
        },
        {
          name: 'createFile',
          title: '创建文件',
          description: '在指定目录下创建一个文件',
          inputSchema: {
            type: 'object',
            properties: {
              filename: {
                type: 'string',
                description: '文件名',
              },
              content: {
                type: 'string',
                description: '文件内容',
              },
            },
            required: ['filename', 'content'],
          },
        },
      ],
    };
  },
};
