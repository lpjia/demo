const BaseService = require('./base');
const TreeData = require('../utils/tree_data');
const NotFoundException = require('../exception/notFound');

class AdminMenuService extends BaseService {

  async getMenuTree() {
    const menus = await this.app.model.AdminMenu.findAll({
      order: [['sort', 'ASC'], ['id', 'ASC']],
      attributes: { exclude: ['delete_time'] },
      // , 'create_time', 'update_time', 'api_route_name', 'icon', 'cache', 'affix', 'breadcrumb', 'remarks', 'sort'
    });
    const tree = new TreeData(menus.map(item => item.toJSON()), 'parent_id', 'id', 'children', []);
    return tree.getTree();
  }

  async findMenu(id) {
    const menu = await this.app.model.AdminMenu.findOne({
      where: {
        id
      },
      attributes: {
        exclude: ['delete_time']
      }
    });
    if (menu === null) {
      throw new NotFoundException('菜单不存在', 22000);
    }
    return menu;
  }

  async createMenu(body) {
    const params = this.app._.cloneDeep(body);
    params.create_time = new Date();
    await this.app.model.AdminMenu.create(params);
  }

  async updateMenu(id, body) {
    const params = this.app._.cloneDeep(body);
    const menu = await this.findMenu(id);
    await menu.update(params);
  }

  async deleteMenu(id) {
    const menu = await this.findMenu(id);
    await menu.destroy();
  }

}

module.exports = AdminMenuService;
