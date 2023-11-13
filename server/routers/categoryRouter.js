const router = require("express").Router();
const { categoryController } = require("../controllers");

router.post("/category", categoryController.addCategory);
router.patch("/category/:id", categoryController.updateCategory);
router.delete("/category/:id", categoryController.deleteCategory);

module.exports = router;
