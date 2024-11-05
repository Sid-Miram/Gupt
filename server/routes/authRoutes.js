const { Router } = require("express");
const authController = require("../controllers/authController.js");
const requireAuth = require("../middleware/authMiddleware.js")
const router = Router();

router.get("/signup", authController.signup_get);                             
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
router.post("/signup", authController.signup_post);
router.put("/update-password", authController.update_password);
router.delete("/delete-user", authController.delete_user);

module.exports = router;

