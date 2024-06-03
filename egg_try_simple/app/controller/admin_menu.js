const BaseController = require('./base');

const menuValidator = {
  title: { require: true, type: 'name', max: 50, field: '菜单名称' },
  parent_id: { require: true, type: 'posint', field: '父级菜单' },
  type: { require: true, type: 'posint', field: '菜单类型' },
  route_name: { require: true, type: 'name', max: 50, field: '前端路由名称' },
  api_route_name: { require: false, type: 'name', max: 50, field: '接口路由' },
  icon: { require: false, type: 'name', max: 50, field: '菜单图标' },
  cache: { require: true, type: 'in_arr', arr: [0, 1], field: '是否缓存' },
  affix: { require: true, type: 'in_arr', arr: [0, 1], field: '标签栏常驻' },
  breadcrumb: { require: true, type: 'in_arr', arr: [0, 1], field: '面包屑是否显示' },
  hidden: { require: true, type: 'in_arr', arr: [0, 1], field: '菜单是否隐藏' },
  remarks: { require: false, type: 'name', max: 100, field: '备注信息' },
  sort: { require: true, type: 'posint', field: '排序' },
};

class AdminMenuController extends BaseController {

  async menuTree() {
    const data = await this.ctx.service.adminMenu.getMenuTree();
    this.success(data);
  }

  async createMenu() {
    this.ctx.validate(menuValidator);
    await this.service.adminMenu.createMenu(this.ctx.request.body);
    this.success();
  }

  async updateMenu() {
    const { body } = this.ctx.request;
    const { id } = this.ctx.params;
    this.ctx.validate(menuValidator);
    await this.service.adminMenu.updateMenu(id, body);
    this.success();
  }

  async readMenu() {
    const { id } = this.ctx.params;
    const data = await this.service.adminMenu.findMenu(id);
    this.success(data);
  }

  async deleteMenu() {
    const { id } = this.ctx.params;
    await this.service.adminMenu.deleteMenu(id);
    this.success();
  }
}

module.exports = AdminMenuController;
