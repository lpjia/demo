import AdminModel from "../model/AdminModel"

class AdminService {
  getAdminOne(data: any) {
    console.log('111:', data)
    return AdminModel.findOne({
      where: {
        name: data.name,
        is_delete: 0
      }
    })
  }

  getAdmin() {
    // return AdminModel.findOne()
    return AdminModel.findByPk(10)
  }

  getAdminById(adminId: number) {
    return AdminModel.findByPk(adminId)
  }


  addAdmin(data: any) {
    console.log('222:', data)
    return AdminModel.create(data)
  }

  // 传id 传修改的字段和值
  updateAdmin(id: number, data: any) {
    // return AdminModel.create(data)
  }
}

export default new AdminService()