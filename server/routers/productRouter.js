const router = require("express").Router();
const { productController } = require("../controllers");
const { multerUpload } = require("../middleware/multer");
const { verifyToken } = require('../middleware/auth');
const { checkRegister, checkResetPassword } = require("../middleware/validator");

router.post('/add-product', verifyToken, productController.addProduct) //register user
router.get('/get-product', verifyToken, productController.getProduct)
router.patch("/update-product", verifyToken, productController.updateProduct);
router.delete('/delete-product/:id', verifyToken, productController.deleteProduct)

module.exports = router