const express = require("express");
const adminController = require("../controller/admin-controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-Middleware");

router.route("/users").get(authMiddleware, adminController.getAllUsers);
router.route("/contacts").get(adminController.getAllContacts);

router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminController.deleteUserById);

router.route("/users/:id").get(authMiddleware, adminController.getUserById);
router
  .route("/users/update/:id")
  .patch(authMiddleware, adminController.updateUserById);

router
  .route("/contacts/delete/:id")
  .delete(authMiddleware, adminController.deleteContactById);
module.exports = router;
