export { }

/* @ts-check 一般在js文件中开头用, 启用类型检查
@ts-nocheck 不检查, 与上面相反

@ts-ignore 永远忽略下一行(可能出现的错误)
@ts-expect-error 忽略下一行错误, 但是修复错误(改对)后, TS编译器就会提示此单行注释报错, 意思是可以删了此单行注释
*/


/* x一开始定义成number类型
然后赋值string, 理论上要报错
加单行注释@ts-expect-error就不会报错
改正确后, 才会报错提示 */
let x = 1
// @ts-expect-error
x = ''