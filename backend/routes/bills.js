const express = require('express');
const {
  addBill,
  getBills,
  updateBill,
  deleteBill,
} = require('../controllers/billController');

const router = express.Router();

router.post('/', addBill);
router.get('/', getBills);
router.put('/:id', updateBill);
router.delete('/:id', deleteBill);

module.exports = router;
