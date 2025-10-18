export const fileSize = (size) => {
  let number = size;
  let unit = 'bype';
  if (number >= 1024 ** 3) {
    number = number / 1024 ** 3;
    unit = 'G';
  } else if (number >= 1024 ** 2) {
    number = number / 1024 ** 2;
    unit = 'M';
  } else if (number >= 1024) {
    number = number / 1024;
    unit = 'KB';
  }
  number = number.toFixed(2);
  return +number + unit;
};

export const extname = (name) => {
  const i = name.lastIndexOf('.');
  if (i >= 0) {
    return name.substring(i).toLowerCase();
  }
  return '';
};
