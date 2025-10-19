import { PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
