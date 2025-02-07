const authService = require("../service/auth.service");

class AuthController {
  async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await authService.register(email, password);
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  async activation(req, res) {
    const userID = req.params.id;
    await authService.activation(userID);
    res.status(200).json({ message: "User is activated!" });
  }
}

module.exports = new AuthController();
