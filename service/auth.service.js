const UserDto = require("../dtos/user.dto");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const tokenService = require("./token.service");

class AuthService {
  async register(email, password) {
    const existUser = await userModel.findOne({ email });

    if (existUser) {
      throw new Error(`User existing email ${email} already registered!`);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ email, password: hashPassword });

    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }

  async activation(userID) {
    const user = await userModel.findById(userID);

    if (!user) {
      throw new Error("User is not defined!");
    }

    user.isActivated = true;
    await user.save();
  }
}

module.exports = new AuthService();
