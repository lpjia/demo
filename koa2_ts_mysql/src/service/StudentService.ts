import StudentModel from "../model/StudentModel"

class StudentService {
  getStudent(data: any) {
    return StudentModel.findOne({
      where: {
        id: data.id
      }
    })
  }

  async updStudent(data: any) {
    console.log('data:', data)
    console.log(
      data.cname1
    )
    return null
    // // StudentModel
    // const student = await StudentModel.findOne({
    //   where: {
    //     id: data.id
    //   }
    // })
    // if (student) {
    //   student.set({ ...data })
    //   student?.save()
    //   return student
    // }


    // console.log(
    //   student?.toJSON()
    // )
    // student!.name = '小黄9'
    // student?.save()

    // return StudentModel.update(data, {
    //   where: {
    //     id: data.id
    //   }
    // })
  }
}

export default new StudentService()