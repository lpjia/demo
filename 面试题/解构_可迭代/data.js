const srcObj = {
  0: 0,
  1: 1,
  2: 2,
  *[Symbol.iterator]() {
    log("!!! Iterator called !!!")
    yield 2
    yield 1
    yield 0
  }
}

const srcArr = [3, 4, 5]
srcArr[Symbol.iterator] = null

const cases = [
  [
    '[...srcObj]',
    'const [...arr] = srcObj; return arr',
  ],
  [
    '[...srcArr]',
    'const [...arr] = srcArr; return arr',
  ],
  [
    '{...srcObj}',
    'const {...obj} = srcObj; return obj',
  ],
  [
    '{...srcArr}',
    'const {...obj} = srcArr; return obj',
  ],
]