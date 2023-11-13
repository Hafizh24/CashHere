const router = require("express").Router();
const { userController } = require("../controller");
const { multerUpload } = require("../middleware/multer");
const { verifyToken } = require('../middleware/auth');
const { checkRegister } = require("../middleware/validator");

router.get('/user-login', userController.userLogin) //login user
router.get('/keep-login', verifyToken, userController.keepLogin) //keep login butuh verify token
router.patch("/change-img", multerUpload().single("image"), userController.updateImage);
router.post('/add-user', verifyToken, checkRegister, userController.addUser) //register user
router.get('/get-user', verifyToken, userController.getUser)
router.patch('/update-user', verifyToken, userController.updateUser)
router.patch('/update-user-password', userController.updateUserPassword)
router.get('/reset-password', userController.resetPassword)
router.delete('/delete-cashier/:id', verifyToken, userController.deleteCashier)

module.exports = router
