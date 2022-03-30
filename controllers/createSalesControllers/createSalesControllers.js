const CreateSales = require("../../models/createSalesModels/CreateSales");

const createSales = async (req, res) => {
  const response = await new CreateSales.create(req.body);
  try {
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { createSales };
