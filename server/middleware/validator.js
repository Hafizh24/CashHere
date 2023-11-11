const { body, validationResult } = require("express-validator");

module.exports = {
  checkImage: async (req, res, next) => {
    try {
      await body("username").notEmpty().withMessage("username Harus diisi").run(req);
      await body("email")
        .notEmpty()
        .withMessage("email Harus diisi")
        .isEmail()
        .withMessage("invalid format")
        .run(req);
      await body("password").notEmpty().withMessage("password Harus diisi").run(req);

      const validation = validationResult(req);

      if (validation.isEmpty()) {
        return next();
      } else {
        return res
          .status(400)
          .send({ message: "validation invalid", error: validation.array() });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
};
