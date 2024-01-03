
const LaboratorySupplyModel = require('../models/LaboratorySupplyModel');

class LaboratorySupplyController {
  static async getAll(req, res) {
    try {
      const laboratorySupplies = await LaboratorySupplyModel.getAll();
      res.json(laboratorySupplies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getById(req, res) {
    const supplyId = req.params.id;
    try {
      const laboratorySupply = await LaboratorySupplyModel.getById(supplyId);
      res.json(laboratorySupply);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async create(req, res) {
    const { name, quantity, reorder_point } = req.body;
    const reorderPointNumber = parseInt(reorder_point, 10);
    
    try {
      const newSupply = await LaboratorySupplyModel.create({ name, quantity, reorder_point: reorderPointNumber });
      res.json(newSupply);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    
  }

  static async update(req, res) {
    const supplyId = req.params.id;
    const { name, quantity, reorder_point } = req.body;
    try {
      const updatedSupply = await LaboratorySupplyModel.update(supplyId, { name, quantity, reorder_point });
      res.json(updatedSupply);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async delete(req, res) {
    const supplyId = req.params.id;
    try {
      const deletedSupply = await LaboratorySupplyModel.delete(supplyId);
      res.json(deletedSupply);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = LaboratorySupplyController;
