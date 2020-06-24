"use strict";
const { validateAll } = use("Validator");
const users = make("App/Services/UserService");

class AuthController {
  async displayLogin({ view }) {
    return view.render("auth.login");
  }

  async userLogin({ request, session, auth, response }) {
    const userData = request.all();
    const rules = {
      email: "required",
      password: "required",
    };

    const validation = await validateAll(userData, rules);
    if (validation.fails()) {
      session.withErrors(validation.messages()).flashExcept(["password"]);
      return response.redirect("back");
    }

    try {
      await users.login(userData, auth);
      return response.redirect("/dashboard");
    } catch (error) {
      session.flash({ error: "Invalid Credentials" });
      return response.redirect("back");
    }
  }
}

module.exports = AuthController;
