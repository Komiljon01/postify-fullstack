const authService = require("../service/auth.service");

class AuthController {
  async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await authService.register(email, password);
      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  async activation(req, res) {
    const userID = req.params.id;
    await authService.activation(userID);
    res.redirect("https://github.com/Komiljon01/");
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const data = await authService.login(email, password);
      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const token = await authService.logout(refreshToken);
      res.clearCookie("refreshToken");
      res.json(token);
    } catch (error) {
      console.log(error);
    }
  }

  async refresh(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const data = await authService.refresh(refreshToken);
      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new AuthController();
