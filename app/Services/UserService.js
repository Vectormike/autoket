const User = use("App/Models/User");
const Hash = use("Hash");
class UserService {
  async register(userData) {
    const hashedPassword = await Hash.make(userData.password);
    const user = new User({
      email: userData.email,
      password: hashedPassword,
    });

    await user.save();

    return user;
  }
  async login(userData, auth) {
    const { email, password } = userData;
    await auth.attempt(email, password);
  }
}

module.exports = UserService;
