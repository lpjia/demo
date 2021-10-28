describe("pow", function () {
  it("n 次方", function () {
    // 一个测试检查一个东西。
    assert.equal(pow(2, 3), 8);
    assert.equal(pow(3, 4), 81);
  });
});


describe("pow", function () {
  function makeTest(x){
    let expected = x * x * x;
    it(`${x} in the power 3 is ${expected}`, function(){
      assert.equal(pow(x, 3), expected)
    })
  }

  for(let x = 1; x <= 5; x++){
    makeTest(x)
  }
});


/**
 * 嵌套 分组
 */
describe("pow", function () {
  describe('raises x to power 3', function(){
    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} in the power 3 is ${expected}`, function () {
        assert.equal(pow(x, 3), expected)
      })
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x)
    }
  })
});


/**
 * 我们可以设置 before/after 函数来在运行测试之前/之后执行。
 * 也可以使用 beforeEach/afterEach 函数来设置在执行 每一个 it 之前/之后执行。
 * 通常，beforeEach/afterEach 和 before/after 被用于执行初始化，清零计数器或做一些介于每个测试（或测试组）之间的事情。
 */
describe('test',function(){
  before(() => console.log('Testing started - before all tests'))
  after(() => console.log('Testing finished - after all tests'))

  beforeEach(() => console.log('Before a test - enter a test'))
  afterEach(() => console.log('After a test - exit a test'))

  it('test 1', () => console.log(1))
  it('test 2', () => console.log(2))
})


describe("pow", function () {
  describe('raises x to power 3', function () {
    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} in the power 3 is ${expected}`, function () {
        assert.equal(pow(x, 3), expected)
      })
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x)
    }
  })

  it('for negative n the result is NaN',function(){
    // 断言语句 assert.isNaN：它用来检查 NaN
    assert.isNaN(pow(2, -1))
  })
  
  it('for non-integer n the result is NaN',function(){
    assert.isNaN(pow(2, 1.5))
  })
});


describe('Raises x to power n', function(){
  it('5 in the power of 1 equals 5', function(){
    assert.equal(pow(5, 1), 5)
  })

  // // Mocha 将只运行这个代码块
  // it.only('5 in the power of 2 equals 25',function(){
  //   assert.equal(pow(5, 2), 25)
  // })

  it('5 in the power of 3 equals 125', function(){
    assert.equal(pow(5, 3), 125)
  })
})