import { createApp } from 'vue';
import Modal from '../components/Modal.vue';

/* 在js文件里怎么弹1个组件? */

export default function showMsg(msg, handler) {
  const dom = document.createElement('div');
  const appComp = createApp(Modal, {
    msg,
    onClick: handler // 这里相当于 Modal作为子组件, 事件以onXxx绑定自定义事件
  });
  appComp.mount(dom);
  document.body.appendChild(dom);

  /* 高阶函数, 闭包, 目的是保存词法作用域 */
  return () => {
    appComp.unmount();
    dom.remove();
  };
}
