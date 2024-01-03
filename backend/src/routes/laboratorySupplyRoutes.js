
const express = require('express');
const LaboratorySupplyController = require('../controllers/LaboratorySupplyController');

const router = express.Router();

router.get('/', LaboratorySupplyController.getAll);
router.get('/:id', LaboratorySupplyController.getById);
router.post('/', LaboratorySupplyController.create);
router.put('/:id', LaboratorySupplyController.update);
router.delete('/:id', LaboratorySupplyController.delete);

module.exports = router;
