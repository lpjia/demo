import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export function testIntHuoStringField(DtoClass: new (...args: any[]) => any, validDto: Record<string, unknown>, field: string) {
  describe(field, () => {
    it('为合法数字字符串时应通过验证', async () => {
      const dto = plainToInstance(DtoClass, { ...validDto, [field]: '1' });
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('为合法数字时应通过验证', async () => {
      const dto = plainToInstance(DtoClass, { ...validDto, [field]: 2 });
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('为空字符串时应被转换为 undefined 并通过验证', async () => {
      const dto = plainToInstance(DtoClass, { ...validDto, [field]: '' });
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('为 null 时应被转换为 undefined 并通过验证', async () => {
      const dto = plainToInstance(DtoClass, { ...validDto, [field]: null });
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('含小数时不应该通过验证', async () => {
      const dto = plainToInstance(DtoClass, { ...validDto, [field]: 2.5 });
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe(field);
    });

    it('含负数时不应该通过验证', async () => {
      const dto = plainToInstance(DtoClass, { ...validDto, [field]: -3 });
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe(field);
    });

    it('含非数字字符时不应该通过验证', async () => {
      const dto = plainToInstance(DtoClass, { ...validDto, [field]: '123abc' });
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe(field);
    });

    it('含中文字符时不应该通过验证', async () => {
      const dto = plainToInstance(DtoClass, { ...validDto, [field]: '6六6' });
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe(field);
    });
  });
}