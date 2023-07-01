const options = [
  { label: '全部', type: 0 },
  { label: '坦克', type: 3 },
  { label: '战士', type: 1 },
  { label: '刺客', type: 4 },
  { label: '法师', type: 2 },
  { label: '射手', type: 5 },
  { label: '辅助', type: 6 },
]
const doms = {
  heroTypeOptions: document.querySelector('.options-box>.types'),
  radios: document.querySelector('.options-box>.options'),
  heroList: document.querySelector('.hero-list'),
  txtKeyword: document.querySelector('#searchBtn')
}

function createOptionElements() {
  let htmlStr = ''
  for (const option of options) {
    htmlStr += `<li data-type="${option.type}" class=${option.type === 0 ? "active" : ""}>
            <span class="radio">
              <i class="circle"></i>
            </span>
            <label>${option.label}</label>
          </li>`
  }
  doms.heroTypeOptions.innerHTML = htmlStr
}
function setHeroHTML(heroList) {
  let keyword = doms.txtKeyword.value
  let reg = null
  if (keyword) {
    reg = new RegExp(keyword, 'gi')
    // reg 其实是一个正则表达式
  }
  let htmlStr = ''
  for (const hero of heroList) {
    let name = hero.cname
    if (reg) { // 正则表达式有值, 说明你在搜索
      // // replace的二参可以用string, 也就是把匹配的字串, 替换成二参的字符串
      // name = name.replace(reg, `<b class="highlight">${keyword}</b>`)

      // 也可以用函数, 函数的参就是匹配的子串, 想起来substring这个方法
      name = name.replace(reg, function (sub) {
        return `<em>${sub}</em>`
      })
    }
    htmlStr += `<li>
                  <a href="">
                    <img src="https://game.gtimg.cn/images/yxzj/img201606/heroimg/${hero.ename}/${hero.ename}.jpg" alt="">
                    <span>${name}</span>
                  </a>
                </li>`
  }
  doms.heroList.innerHTML = htmlStr
}
function filterHero(heroList, key, typeNum) {
  return heroList.filter((hero) => {
    if (typeNum) {
      if (hero[key] == typeNum) {
        return hero
      }
    }
    else {
      if (hero.cname.includes(doms.txtKeyword.value)) {
        return hero
      }
    }
  })
}

function input() {
  // console.log(e.target.value === this.value)
  for (const child of doms.radios.children) {
    child.classList.remove('active')
  }
  for (const child of doms.heroTypeOptions.children) {
    child.classList.remove('active')
  }
  doms.heroTypeOptions.children[0].classList.add('active')
  const filterHeroList = filterHero(heroList)
  setHeroHTML(filterHeroList)
}
function keyup(e) {
  if (e.keyCode != 13) return;
  input()
}

document.addEventListener('DOMContentLoaded', () => {
  createOptionElements()
  setHeroHTML(heroList)

  doms.txtKeyword.addEventListener('input', input)
  doms.txtKeyword.addEventListener('keyup', keyup)

  doms.heroTypeOptions.addEventListener('click', (e) => {
    /* 利用事件委托
    e.currentTarget永远指向doms.heroTypeOptions
    但是e.target可不一定指向预期的li(鼠标有可能点击的是li的子元素)
    得保证点击到的元素不能是e.currentTarget, e.target === e.currentTarget
    如果点击的是li的子元素, 那么需要找它最近的祖先元素.closest(sel) */
    if (e.target === e.currentTarget) return;
    let li = e.target.closest('li')
    // HTMLCollection, 类数组, 不能直接用数组的方法, 但是 for...of 直接遍历类数组
    for (const child of doms.radios.children) {
      child.classList.remove('active')
    }
    if (li.classList.contains('active')) return;
    for (const bro of li.parentNode.children) {
      bro.classList.remove('active')
    }
    li.classList.add('active')

    if (li.dataset.type == 0) {
      setHeroHTML(heroList)
      return;
    }
    const filterHeroList = filterHero(heroList, 'hero_type', li.dataset.type)
    setHeroHTML(filterHeroList)
  })

  doms.radios.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) return;
    let li = e.target.closest('li')
    for (const child of doms.heroTypeOptions.children) {
      child.classList.remove('active')
    }
    if (li.classList.contains('active')) return;
    for (const bro of li.parentNode.children) {
      bro.classList.remove('active')
    }
    li.classList.add('active')

    const filterHeroList = filterHero(heroList, 'pay_type', li.dataset.ptype)
    setHeroHTML(filterHeroList)
  })
});