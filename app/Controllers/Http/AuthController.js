"use strict";
const { validateAll } = use("Validator");
const users = make("App/Services/UserService");

class AuthController {
  async displayRegister({ view }) {
    return view.render("auth.register");
  }

  async userRegister({ request, session, response }) {
    const userData = request.only([
      "email",
      "password",
      "password_confirmation",
    ]);

    const rules = {
      email: "required|email|max:255|unique:users",
      password: "required|min:6|max:30",
      password_confirmation: "required_if:password|min:6|max:30|same:password",
    };
    const validation = await validateAll(userData, rules);
    if (validation.fails()) {
      session.withErrors(validation.messages()).flashExcept(["password"]);
      return response.redirect("back");
    }

    try {
      await users.register(userData);
      return response.redirect("/dashboard");
    } catch (error) {
      session.flash({ error: "Unable to register" });
      return response.redirect("back");
    }
  }
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
