import { calcPricePer } from './calcPricePer';

describe('calcPricePer', () => {
  it('应该把 ml 规格换算成 元/L', () => {
    expect(calcPricePer('500ml', '15')).toBe('30.00 元/L');
  });

  it('应该把 L 规格换算成 元/L', () => {
    expect(calcPricePer('2L', '18')).toBe('9.00 元/L');
  });

  it('应该把 g 规格换算成 元/kg', () => {
    expect(calcPricePer('250g', '10')).toBe('40.00 元/kg');
  });

  it('应该把 kg 规格换算成 元/kg', () => {
    expect(calcPricePer('1.5kg', '36')).toBe('24.00 元/kg');
  });

  it('应该忽略大小写和空格', () => {
    expect(calcPricePer(' 750 ML ', '21')).toBe('28.00 元/L');
  });

  it('规格无法识别时应该返回 undefined', () => {
    expect(calcPricePer('1瓶', '10')).toBeUndefined();
  });

  it('价格不是数字时应该返回 undefined', () => {
    expect(calcPricePer('500ml', 'abc')).toBeUndefined();
  });

  it('规格数值为 0 时应该返回 undefined', () => {
    expect(calcPricePer('0ml', '10')).toBeUndefined();
  });
});
