const db = require("../models");
const Product = db.Product;

module.exports = {
    addProduct: async (req, res) => {
        try {
          const { name, price, quantity, description } = req.body;
    
          //check if product already exist
          const findProduct = await Product.findOne({
            where: {
              name: name,
            },
          });
    
          //if product isn't already exist
          if (findProduct == null) { 
            await Product.create({
              name: name,
              price: price,
              quantity: quantity,
              description: description
            });
          } else {
            return res.status(400).send({ message: "Product already exist" });
          }
          res.status(200).send({ message: "Register Success" });
        } catch (error) {
          console.log("This is the error", error);
          res.status(400).send({ error: error.message });
        }
      },
      getProduct: async (req, res) => {
        try {
          const dataProduct = await Product.findAll();
          res.status(200).send({ dataProduct });
        } catch (error) {
          console.log("This is the error", error);
          res.status(400).send({ error: error.message });
        }
      },
}