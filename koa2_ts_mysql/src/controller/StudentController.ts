import { createReadStream, createWriteStream } from "node:fs";
import { extname, parse } from "node:path";
import { PassThrough } from "node:stream";
import { Context } from "koa"
import { File } from '../../node_modules/.pnpm/@types+formidable@1.2.5/node_modules/@types/formidable/index';
import StudentService from "../service/StudentService"
import { sendMessage } from "./fn";


class StudentController {
  test(ctx: Context) {
    const { query } = ctx.request
    console.log(
      query
    )
    ctx.body = {
      code: 0,
      msg: 'success',
      data: null
    }
    // ctx.body = [10, 11, 12]
  }

  async getStudent(ctx: Context) {
    // console.log(
    //   ctx,
    //   ctx.request,
    //   ctx.request.query,
    //   ctx.request.querystring,
    // )
    const { query } = ctx.request
    /* 数据库对number 1和string 1其实不敏感 */
    // const result = await StudentService.getStudent({ id: Number(query.id) })
    const result = await StudentService.getStudent({ id: query.id })
    console.log(
      // query.id,
      result,
    )
    ctx.body = {
      code: 0,
      msg: 'success',
      data: result
    }
  }

  async updStudent(ctx: Context) {
    console.log(
      // ctx,
      // ctx.request,
      ctx.request.body,
      // ctx.request.querystring,
    )

    const result = await StudentService.updStudent(ctx.request.body)
    // console.log(
    //   // query.id,
    //   result,
    // )
    ctx.body = {
      code: 0,
      msg: 'success',
      data: result
    }
  }

  /* 文件上传, 首先操作系统会生成一个临时文件
  ctx.request.files // 其实包了一层键值对, 前端传过来的可以当作一个form对象, 以name值为键, 文件为值, inputFile就是键
  ctx.request.files.inputFile // 多个文件返回数组, 单个文件返回对象 */
  async uploadSingle(ctx: Context) {
    const fileForm = ctx.request.files
    // 判断有没有文件
    if (fileForm?.inputFile) {
      const file = fileForm?.inputFile as unknown as File

      // 判断文件类型, 先只允许上传图片
      const fileType = file.type
      const imgTypeSet = new Set(['image/jpeg', 'image/jpg', 'image/gif', 'image/png'])
      if (!imgTypeSet.has(fileType!)) {
        /* 如需提前响应, 用return ctx.body */
        return ctx.body = {
          code: 1,
          msg: '文件类型错误',
          data: null
        }
      }

      // 得到扩展名, 带.
      const ext = extname(file.name!)

      // 随机字符
      let urlObj = URL.createObjectURL(new Blob())
      let randomStr = urlObj.slice(-36)

      const filePath = `/upload/${randomStr}${ext}`

      // 创建可读流
      const reader = createReadStream(file.path)
      // 创建可写流
      // const writer = createWriteStream(file.name!) // 写入原文件名
      // const writer = createWriteStream(`${randomStr}${ext}`) // 写入随机名
      const writer = createWriteStream(`static/${filePath}`)
      // 可读流通过管道写入可写流
      reader.pipe(writer)

      // 手动释放内存
      URL.revokeObjectURL(urlObj)
      urlObj = ''

      return ctx.body = {
        code: 0,
        msg: 'success',
        data: {
          // filePath
        }
      }
    }

    ctx.body = {
      code: 1,
      msg: 'error',
    }
  }

  /* 多文件上传 */
  async uploadMultiple(ctx: Context) {
    const fileForm = ctx.request.files
    const filePathList = []
    if (fileForm?.inputFile) {
      const files = fileForm?.inputFile as unknown as File[]
      for (const file of files) {
        // 得到扩展名, 带.
        const ext = extname(file.name!)

        // 随机字符
        let urlObj = URL.createObjectURL(new Blob())
        let randomStr = urlObj.slice(-36)

        const filePath = `/upload/${randomStr}${ext}`

        const reader = createReadStream(file.path)
        const writer = createWriteStream(`static/${filePath}`)
        reader.pipe(writer)
        URL.revokeObjectURL(urlObj)
        urlObj = ''

        filePathList.push(filePath)
      }
    }

    ctx.body = {
      code: 0,
      msg: 'success',
      data: filePathList
    }
  }

  /* 文本数据的流式获取, chatgpt的对话响应方式
  https://juejin.cn/post/7212270321622286394 */
  // async chatGptText(ctx: Context) {
  chatGptText = async (ctx: Context) => { // 类字段写法
    // 1. 设置响应头
    ctx.set({
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream', // 表示返回数据是个 stream
    });

    // 2. 创建流、并作为接口数据进行返回
    const stream = new PassThrough();
    ctx.body = stream;

    // 3. 推送流数据
    this.sendMessage(stream)
    // sendMessage(stream)
  }

  async sendMessage(stream: PassThrough) {
    const data = [
      '现在科学技术的发展速度叫人惊叹',
      '同样在数码相机的技术创新上',
      '随着数码相机越来越普及',
      '数码相机现已成为大家生活中不可缺少的电子产品',
      '而正是因为这样，技术的创新也显得尤为重要',
    ];
    const data2 = data.join(',').split('')

    // 循环上面数组: 推送数据、休眠 2 秒
    for (const value of data2) {
      // stream.write(`data: ${value}\n\n`); // 写入数据(推送数据)
      stream.write(value); // 写入数据(推送数据)
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    // 结束流
    stream.end();
  }
}

export default new StudentController()