const router = require("express").Router();
const { transactionProductController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");

router.get("/", transactionProductController.getAllTransaction);
router.post("/", verifyToken, transactionProductController.addTransaction);

module.exports = router;
