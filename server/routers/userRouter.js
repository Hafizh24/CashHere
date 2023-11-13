const router = require("express").Router();
const { userController } = require("../controllers");
const { multerUpload } = require("../middleware/multer");

router.patch("/change-img", multerUpload().single("image"), userController.updateImage);

module.exports = router;
