import User from "../models/user.mjs";
class ApiUserController {
  static async index(req, res) {
    try {
      let users = await User.find({});
      res.status(200).json({ message: "Lay du lieu thanh cong!", data: users });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async show(req, res) {
    let id = req.params.id;
    let user = await User.findById(id);
    res.status(200).json({ message: "Lay du lieu thanh cong!", data: user });
  }

  static async delete(req, res) {
    let id = req.params.id;
    let user = await User.deleteOne({ _id: id });
    res.status(200).json({ message: "Xoa du lieu thanh cong!", data: user });
  }

  static async create(req, res) {
    console.log(req.body);
    let { name, email } = req.body;
    let user = await User.create({ name, email });
    res.status(200).json({ message: "Tao du lieu thanh cong!", data: user });
  }

  static async update(req, res) {
    let id = req.params.id;
    let { name, email } = req.body;
    let user = await User.updateOne({ _id: id }, { name, email });
    res.status(200).json({ message: "Update du lieu thanh cong!", data: user });
  }
}

export default ApiUserController;
