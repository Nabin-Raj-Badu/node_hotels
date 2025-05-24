const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

// ✅ POST: Add a new person
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log('Person saved');
    res.status(200).json(response);
  } catch (err) {
    console.error('Error saving person:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ GET all persons
router.get('/', async (req, res) => {
  try {
    const data = await Person.find();
    console.log('Data fetched');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ GET: Persons by work type
router.get('/work/:workType', async (req, res) => {
  try {
    const workType = req.params.workType;
    if (['chef', 'manager', 'waiter'].includes(workType)) {
      const response = await Person.find({ work: workType });
      console.log('Persons fetched by work type');
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: 'Invalid work type' });
    }
  } catch (err) {
    console.error('Error fetching person by workType:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ PUT: Update person
router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log('Person data updated:', response);
    res.status(200).json(response);
  } catch (err) {
    console.error('Error updating person:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ DELETE: Delete person by ID
router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log('Person data deleted successfully:', response);
    res.status(200).json({ message: 'Person deleted successfully', data: response });
  } catch (err) {
    console.error('Error deleting person:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
