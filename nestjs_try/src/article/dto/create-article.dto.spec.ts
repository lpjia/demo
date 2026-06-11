import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateArticleDto } from './create-article.dto';
import { testIntHuoStringField } from '#/core/util/testCommonFieldDto';

describe('CreateArticleDto', () => {
  const validDto = {
    title: 'NestJS 入门',
    author: '张三',
    content: '文章内容...',
    type: 1,
  };

  describe('基础验证', () => {
    it('合法的完整数据应通过验证', async () => {
      const dto = plainToInstance(CreateArticleDto, validDto);
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('合法的数据(含可选字段)应通过验证', async () => {
      const dto = plainToInstance(CreateArticleDto, {
        ...validDto,
        coverUrl: 'https://example.com/cover.png',
        kindId: '123',
        tagId: '456',
      });
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });
  });

  describe('title', () => {
    it('为空时不应该通过验证', async () => {
      const dto = plainToInstance(CreateArticleDto, { ...validDto, title: '' });
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('title');
    });
  });

  describe('author', () => {
    it('为空时不应该通过验证', async () => {
      const dto = plainToInstance(CreateArticleDto, { ...validDto, author: '' });
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('author');
    });
  });

  describe('type', () => {
    it('为空时不应该通过验证', async () => {
      const dto = plainToInstance(CreateArticleDto, { ...validDto, type: undefined });
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('type');
    });

    it('为非整数时不应该通过验证', async () => {
      const dto = plainToInstance(CreateArticleDto, { ...validDto, type: 1.5 });
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('type');
    });

    it('大于 3 时不应该通过验证', async () => {
      const dto = plainToInstance(CreateArticleDto, { ...validDto, type: 4 });
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('type');
    });

    it('小于 1 时不应该通过验证', async () => {
      const dto = plainToInstance(CreateArticleDto, { ...validDto, type: 0 });
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('type');
    });
  });

  testIntHuoStringField(CreateArticleDto, validDto, 'kindId');
  testIntHuoStringField(CreateArticleDto, validDto, 'tagId');
});