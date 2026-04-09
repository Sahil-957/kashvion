const Bill = require('../models/Bill');

function deriveStatus(dueDate, currentStatus) {
  if (currentStatus === 'paid') {
    return 'paid';
  }

  const due = new Date(dueDate);
  const today = new Date();
  due.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return due < today ? 'overdue' : 'upcoming';
}

async function addBill(req, res) {
  try {
    const payload = {
      ...req.body,
      status: deriveStatus(req.body.dueDate, req.body.status),
    };
    const bill = await Bill.create(payload);
    res.status(201).json(bill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getBills(req, res) {
  try {
    const bills = await Bill.find().sort({ dueDate: 1, createdAt: -1 });
    const normalized = bills.map((bill) => {
      const current = bill.toObject();
      current.status = deriveStatus(current.dueDate, current.status);
      return current;
    });

    const filtered =
      req.query.status && ['upcoming', 'overdue', 'paid'].includes(req.query.status)
        ? normalized.filter((bill) => bill.status === req.query.status)
        : normalized;

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateBill(req, res) {
  try {
    const payload = {
      ...req.body,
      status: deriveStatus(req.body.dueDate, req.body.status),
    };
    const updated = await Bill.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    return res.json(updated);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function deleteBill(req, res) {
  try {
    const deleted = await Bill.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    return res.json({ message: 'Bill deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  addBill,
  getBills,
  updateBill,
  deleteBill,
};
