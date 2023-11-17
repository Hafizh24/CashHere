const db = require("../models");
const Transaction = db.Transaction;
const Product = db.Product;
const TransactionProduct = db.TransactionProducts;

module.exports = {
  addTransaction: async (req, res) => {
    const { product, total_price } = req.body;

    try {
      const transaction = await Transaction.create({
        total_price,
        UserId: req.user.id,
      });

      const data = product.map((item) => ({
        ProductId: item.id,
        quantity: item.quantity,
        TransactionId: transaction.id,
      }));

      const result = await TransactionProduct.bulkCreate(data);

      res.status(200).send({ message: "success create transaction", data: result });
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: error.message });
    }
  },
  getAllTransaction: async (req, res) => {
    try {
      const result = await TransactionProduct.findAll();
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: error.message });
    }
  },
};
