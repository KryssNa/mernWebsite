const express = require("express");
const router = express.Router();
const authController = require("../controller/auth-controller");
const {
  registerSchema,
  loginSchema,
} = require("../validators/auth-validators");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-Middleware");

router.route("/").get(authController.home);
router
  .route("/register")
  .post(validate(registerSchema), authController.register);
router.route("/login").post(validate(loginSchema), authController.login);
router.route("/user").get(authMiddleware, authController.user);

module.exports = router;
