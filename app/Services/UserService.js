const User = use("App/Models/User");

class UserService {
  async login(userData, auth) {
    const { email, password } = userData;
    await auth.attempt(email, password);
  }
}

module.exports = UserService;
