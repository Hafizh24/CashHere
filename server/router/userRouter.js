const router = require("express").Router();
const { userController } = require("../controller");
const { multerUpload } = require("../middleware/multer");

router.patch("/change-img", multerUpload().single("image"), userController.updateImage);
