"use strict";

const { RouteResource } = require("@adonisjs/framework/src/Route/Manager");

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/register", "Auth/AuthController.displayRegister").as(
  "registerPage"
);
Route.post("/register", "Auth/AuthController.userRegister").as("register");
Route.on("/").render("welcome");
Route.on("/login").render("login");
