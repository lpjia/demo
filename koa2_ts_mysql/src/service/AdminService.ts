import { Optional } from "sequelize/types"
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


  addAdmin(data: Optional<any, string> | undefined) {
    return AdminModel.create(data)
  }

  // 传id 传修改的字段和值
  updateAdmin(id: number, data: Optional<any, string> | undefined) {
    return AdminModel.create(data)
  }
}

export default new AdminService()