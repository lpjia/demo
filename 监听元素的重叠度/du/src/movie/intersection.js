var loading = document.querySelector('.loading');

// 建立观察者
var ob = new IntersectionObserver(
  function (entries) {
    var entry = entries[0];
    if (entry.isIntersecting && !isLoading) {
      more();
      console.log('加载更多');
    }
  },
  {
    thresholds: 0.1,
  }
);

// 观察
ob.observe(loading);
