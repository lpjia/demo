/* const observer = new IntersectionObserver(handleIntersect, options); */

const image = document.querySelector('img');

const handleIntersect = (entries, observer) => {

  for (const entry of entries) {
    console.log('entry:', entry)
    if (entry.isIntersecting) { // isIntersecting 是否重叠


      observer.unobserve(image) // 停止观察该元素
    }
  }

  // console.log('observer:', observer)
};
const options = {
  root: null, // 默认为视口
  rootMargin: '0px 0px 50px 0px', // 提前 50px 开始加载，优化用户体验
  threshold: 0.01 // 只要出现 1% 像素就触发
};
const ob = new IntersectionObserver(handleIntersect, options) // 创建重叠度观察器

ob.observe(image) // 观察该元素