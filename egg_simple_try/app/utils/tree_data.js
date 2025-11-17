'use strict';

class TreeData {
  /*
   * 构造方法
   * @param data 扁平数组
   * @param parentField 父级id
   * @param primaryField 子级id
   * @param childrenField 子数据字段名称
   * @param defaultChildrenValue 子数据默认值
   */
  constructor(data, parentField = null, primaryField = null, childrenField = null, defaultChildrenValue = []) {
    this.data = data;
    this.parentField = parentField || 'parent_id';
    this.primaryField = primaryField || 'id';
    this.childrenField = childrenField || 'children';
    this.defaultChildrenValue = defaultChildrenValue;
  }

  getChild (myid) {
    const temp = [];
    this.data.forEach(v => {
      if (v[this.parentField] === myid) {
        temp.push(v);
      }
    });
    return temp;
  }

  getTree (pid = 0) {
    const temp = [];
    const child = this.getChild(pid);
    if (child.length > 0) {
      child.forEach(v => {
        v[this.childrenField] = this.getTree(v[this.primaryField]);
        temp.push(v);
      });
    }
    return temp.length > 0 ? temp : this.defaultChildrenValue;
  }

  getLeaf () {
    const temp = [];
    this.data.forEach(v => {
      if (this.getChild(v[this.primaryField]).length === 0) {
        temp.push(v);
      }
    });
    return temp;
  }
}

module.exports = TreeData;
