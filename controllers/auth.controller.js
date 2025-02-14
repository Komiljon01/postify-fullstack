const BaseError = require("../errors/base.error");
const authService = require("../service/auth.service");
const { validationResult } = require("express-validator");

class AuthController {
  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          BaseError.BadRequest("Error with validation", errors.array())
        );
      }
      const { email, password } = req.body;
      const data = await authService.register(email, password);
      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  async activation(req, res, next) {
    try {
      const userID = req.params.id;
      await authService.activation(userID);
      res.redirect("https://github.com/Komiljon01/");
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await authService.login(email, password);
      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await authService.logout(refreshToken);
      res.clearCookie("refreshToken");
      res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const data = await authService.refresh(refreshToken);
      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const data = await authService.getUsers();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      await authService.forgotPassword(req.body.email);
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }

  async recoveryAccount(req, res, next) {
    try {
      const { token, password } = req.body;
      await authService.recoveryAccount(token, password);
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
