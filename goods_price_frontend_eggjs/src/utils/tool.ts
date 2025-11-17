/* 把年月日这样的日期, 保留每年第一个日期的年, 不保留剩余日期的年 */
export function formatDatesByYear(dates: string[]): string[] {
  // 转换为包含原始字符串和Date对象的数组并排序
  const sortedDates = [...dates]
    .map(dateStr => ({
      original: dateStr,
      date: new Date(dateStr)
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  // 按年份分组
  const yearGroups: Record<number, string[]> = {};
  sortedDates.forEach(item => {
    const year = item.date.getFullYear();
    if (!yearGroups[year]) {
      yearGroups[year] = [];
    }
    yearGroups[year].push(item.original);
  });

  // 处理每个年份的日期格式
  const result: string[] = [];
  Object.values(yearGroups).forEach(group => {
    // 保留每年第一个日期的完整格式
    result.push(group[0]);

    // 其余日期只保留月日部分
    for (let i = 1; i < group.length; i++) {
      const [, month, day] = group[i].split('-');
      if (month && day) { // 确保分割后的部分有效
        result.push(`${month}-${day}`);
      } else {
        // 处理格式异常的日期，这里简单保留原始格式
        result.push(group[i]);
      }
    }
  });

  return result;
}