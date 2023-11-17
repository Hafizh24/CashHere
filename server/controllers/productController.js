const db = require("../models");
const Product = db.Product;

module.exports = {
    addProduct: async (req, res) => {
        try {
          const { name, price, total_stock, description } = req.body;
    
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
              total_stock: total_stock,
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
      updateProduct: async (req, res) => {
        const { id, name, price, description, image, total_stock, isActive } = req.body;
        const updateFields = {
            ...(name && { name }),
            ...(price && { price }),
            ...(description && { description }),
            ...(image && { image }),
            ...(total_stock && { total_stock }),
          };

        if(isActive === true){
          updateFields.isActive = true
        }else{
          updateFields.isActive = false
        }
        
        try{
            await Product.update(updateFields, { where:{ id: id } })
            res.status(200).send({ message: "Product updated" });
        }catch(error){
            console.log("This is the error", error);
            res.status(400).send({ error: error.message });
        }
      },
      deleteProduct: async (req, res) => {
        const id = req.params.id;
        try {
            await Product.destroy({
                where: {
                id: id,
                },
            });
        res.status(200).send({ message: "Account successfully deleted" });
        } catch (error) {
        console.log("This is the error", error);
        res.status(400).send({ error: error.message });
        }
    },
}