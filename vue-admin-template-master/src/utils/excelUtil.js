
export function numToExcelCol(n) {
  let ordA = 'A'.charCodeAt(0)
  let ordZ = 'Z'.charCodeAt(0)
  let len = ordZ - ordA + 1
  let s = ''
  while (n >= 0) {
    s = String.fromCharCode((n % len) + ordA) + s
    n = Math.floor(n / len) - 1
  }
  return s
}

export function calculateContentWidth(content, fontSize = 12) {
  if (!content) return 5; // 空内容默认宽度

  // 正则区分全角（中文/全角标点）和半角（英文/数字/半角标点）
  const fullWidthReg = /[^\x00-\xff]/g; // 匹配全角字符
  const halfWidthReg = /[\x00-\xff]/g; // 匹配半角字符

  // 统计全角和半角字符数量
  const fullWidthCount = (content.match(fullWidthReg) || []).length;
  const halfWidthCount = (content.match(halfWidthReg) || []).length;

  // 基准单位：字体大小对应的宽度系数（12号字体≈1.2，可微调）
  const baseUnit = fontSize * 0.1;
  // 总宽度 = 全角字符数×2×基准单位 + 半角字符数×1×基准单位 + 2（左右边距）
  return fullWidthCount * 2 * baseUnit + halfWidthCount * 1 * baseUnit + 2;
}
export function calculateRowHeight(content, fontSize = 12) {
  if (!content) return 18; // 空内容默认行高

  // 按换行符拆分，计算行数（Excel中\n会自动换行）
  const lineCount = content.split('\n').length;
  // 行高 = 行数 ×（字体大小 + 4）+ 2（上下边距）
  return lineCount * (fontSize + 4) + 2;
}
export function autoAdjustCellSizes(worksheet, startRow = 1, endRow = worksheet.rowCount, fontSize = 12) {
  // 1. 遍历行，计算每行的列宽和行高
  for (let rowNum = startRow; rowNum <= endRow; rowNum++) {
    const row = worksheet.getRow(rowNum);
    if (!row) continue;

    // 2. 计算当前行的行高（取该行所有单元格中最大的行高需求）
    let maxRowHeight = 0;
    row.eachCell(cell => {
      const cellValue = cell.value?.toString() || '';
      const rowHeight = calculateRowHeight(cellValue, fontSize);
      if (rowHeight > maxRowHeight) maxRowHeight = rowHeight;
    });
    row.height = maxRowHeight; // 设置行高

    // 3. 计算每列的宽度（取该列所有单元格中最大的宽度需求）
    row.eachCell(cell => {
      const col = worksheet.getColumn(cell.col);
      const cellValue = cell.value?.toString() || '';
      const colWidth = calculateContentWidth(cellValue, fontSize);
      // 只设置比当前列宽更大的宽度（避免被更小的内容覆盖）
      if (colWidth > (col.width || 0)) col.width = colWidth;
    });
  }
}