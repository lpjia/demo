import './index.less';
import { getMovies } from '../api/movie';
import $ from 'jquery';
import loadingUrl from './loading.gif';
window.isLoading = true;
let pageIndex = 0;
let pageSize = 16;
let pageNumber = null;
// doms
let container, loading;
/**
 * 初始化函数，负责创建容器
 */
function init() {
  container = $('<div>').addClass('container').appendTo('#app');
  loading = $('<div>')
    .addClass('loading')
    .appendTo('#app')
    .html(`<img src="${loadingUrl}">`);
}
init();

async function more() {
  window.isLoading = true;
  pageIndex++;
  await createMovieTags();
  if (pageIndex >= pageNumber) {
    loading.remove();
  }
  window.isLoading = false;
}
async function createMovieTags() {
  if (pageNumber !== null && pageIndex > pageNumber) {
    return;
  }
  let resp = await getMovies(pageIndex, pageSize);
  resp = resp.data;
  if (!pageNumber) {
    pageNumber = Math.ceil(resp.movieTotal / pageSize);
  }
  const result = resp.movieList
    .map(
      (m) => `<div>
    <a href="${m.url}" target="_blank"><img src="${m.cover}"></a>
    <a href="${m.url}" target="_blank"><p class="title">${m.title}</p></a>
    <p class="rate">${m.rate}</p>
    </div>`
    )
    .join('');
  $(result).appendTo(container);
}

window.more = more;

more();

import('./intersection');
