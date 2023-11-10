const db = require("../models");
const User = db.User;

module.exports = {
  updateImage: async (req, res) => {
    try {
      await User.update({
        image: req.file?.path,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: error.message });
    }
  },
};
