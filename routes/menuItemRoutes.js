const express = require('express');
const router = express.Router();

const MenuItem = require('./../models/MenuItem');
// ✅ POST: Add a new menu item
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newItem = new MenuItem(data);
    const response = await newItem.save();
    console.log('Menu item saved');
    res.status(200).json(response);
  } catch (err) {
    console.error('Error saving menu item:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ GET: Get all menu items
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);
  } catch (err) {
    console.error('Error fetching menu items:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ GET: Get persons by work type (chef, manager, waiter)
router.get('/:taste', async (req, res) => {
  try {
    const taste = req.params.taste;
    if (['sweet', 'Sour', 'salty', 'bitter'].includes(taste)) {
      const response = await MenuItem.find({ work: taste });
      console.log('MenuItem fetched by taste type');
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: 'Invalid taste type' });
    }
  } catch (err) {
    console.error('Error fetching MenuItem by taste:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;