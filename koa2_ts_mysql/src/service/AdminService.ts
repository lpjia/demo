import AdminModel from "../model/AdminModel"

class AdminService {
  getAdminOne() {
    return AdminModel.findOne()
  }

  getAdmin() {
    // return AdminModel.findOne()
    return AdminModel.findByPk(10)
  }

  getAdminById(adminId: number) {
    return AdminModel.findByPk(adminId)
  }
}

export default new AdminService()