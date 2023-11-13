const db = require("../models");
const Category = db.Category;

module.exports = {
  addCategory: async (req, res) => {
    try {
      const result = await Category.create({
        name: req.body.name,
      });

      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: error.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      await Category.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send("success deleted category");
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: error.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const result = await Category.update(
        {
          name: req.body.name,
        },
        {
          where: req.params.id,
        }
      );
      res.status(200).send({ message: "success updated category", data: result });
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: error.message });
    }
  },
};
