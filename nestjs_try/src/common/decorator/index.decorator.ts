import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsArray, IsString, Matches, ValidationOptions } from 'class-validator';

export function IsArrayOfIntHuoString(
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (target: object, propKey: string | symbol) => {
    const field = String(propKey);
    applyDecorators(
      Transform(({ value: val }) => {
        if (!Array.isArray(val)) {
          return val;
        }
        return val
          .filter((value) => value !== null && value !== void 0 && value !== '') // 直接去掉, 空''也不能通过正则校验
          .map((value) => {
            if (typeof value === 'number') {
              return String(value);
            }
            return value;
          });
      }),
      IsArray({ message: `${field} 必须是数组类型` }),
      IsString({
        message: `${field} 数组项必须是字符串类型`,
        ...validationOptions
      }),
      Matches(/^\d+$/, {
        message: `${field} 数组项必须是整数或整数字符串, 需要>=0`,
        ...validationOptions
      })
    )(target, propKey);
  };
}

export function IsIntHuoString(): PropertyDecorator {
  return (target: object, propKey: string | symbol) => {
    const field = String(propKey);
    applyDecorators(
      Transform(({ value }) => {
        if (value === null || value === void 0 || value === '') {
          return void 0; // undefined 作为字段值, 会被typeorm忽略去掉该字段, sql就用默认值改数据库
        }
        if (typeof value === 'number') {
          return String(value);
        }
        return value;
      }),
      IsString({ message: `${field} 必须是字符串类型` }),
      Matches(/^\d+$/, { message: `${field} 必须是整数或整数字符串, 需要>=0` })
    )(target, propKey);
  };
}
/* export function IsIntHuoString() { // 第一版:字段写死
  return applyDecorators(
    Transform(({ value }) => {
      if (value === null || value === void 0 || value === '') {
        return void 0;
      }
      if (typeof value === 'number') {
        return String(value);
      }
      return value;
    }),
    IsString({ message: 'tagId 必须是字符串类型' }),
    Matches(/^\d+$/, { message: 'tagId 必须是整数或整数字符串, 需要>=0' })
  )
} */
