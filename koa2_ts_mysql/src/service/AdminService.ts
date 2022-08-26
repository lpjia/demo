import AdminModel from "../model/AdminModel"

class AdminService {
  getAdmin() {

    return AdminModel.findOne()
  }
}

export default new AdminService()