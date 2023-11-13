const db = require("../models");
const User = db.User;

module.exports = {
  updateImage: async (req, res) => {
    try {
      await User.update(
        {
          image: req.file?.path,
        },
        {
          where: { id: 1 },
        }
      );
      res.status(200).send("success upload");
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: error.message });
    }
  },
};
