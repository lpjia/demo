import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ProductService } from '../product/product.service';
import { Raw } from 'typeorm';
// import Big from 'big.js';
import { calcPricePerByPrice } from 'src/common/utils/calcPricePer';

/* function calcPricePerByPrice(spec: string, price: string): string | undefined {
  const match = spec.match(/(\d+\.?\d*)\s*(ml|L|g|kg)/i);
  if (!match) {
    return;
  }

  const value = parseFloat(match[1]);
  const unit = match[2].toLowerCase();
  const priceNum = parseFloat(price);

  if (Number.isNaN(value) || Number.isNaN(priceNum) || value === 0) {
    return;
  }

  let pricePerUnit = 0;
  let unitLabel = '';

  if (unit === 'ml' || unit === 'l') {
    const liters = unit === 'ml' ? value / 1000 : value;
    pricePerUnit = priceNum / liters;
    unitLabel = '元/L';
  }
  else if (unit === 'g' || unit === 'kg') {
    const kgs = unit === 'g' ? value / 1000 : value;
    pricePerUnit = priceNum / kgs;
    unitLabel = '元/kg';
  }

  return new Big(pricePerUnit).toFixed(2) + ' ' + unitLabel;
} */

async function run() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(ProductService);

  // 先把符合条件的数据都查出来
  const result = await service.productHistoryRepository.find({
    where: [ // 在 Raw 里面需要把 \ 写成 \\（JavaScript 字符串转义）
      { spec: Raw((alias) => `${alias} REGEXP '[0-9]+[[:space:]]*(g|kg|ml|L)\\\\b'`,), },
      { spec: Raw((alias) => `${alias} REGEXP '[0-9]+\\\\.?[0-9]*[[:space:]]*(g|kg|ml|L)\\\\b'`,), },
    ],
  });

  // 像操作普通js对象一样
  for (const item of result) {
    const resultStr = calcPricePerByPrice(item.spec, item.price);
    if (resultStr) {
      item.pricePer = resultStr
    }
  }

  // 保存到表
  await service.productHistoryRepository.save(result);

  await app.close();
}

run().catch(console.error).finally(() => process.exit(0));
