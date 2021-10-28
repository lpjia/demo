function pow(x, n){
  if (n < 0) return NaN;
  if (Math.round(n) != n) return NaN;
  return Math.pow(x, n)
}