const express = require('express');
const router = express.Router();
const PersonController = require('../controllers/personController');
const auth = require('../middleware/auth');

router.post('/add', auth, PersonController.addPerson);
router.get('/', auth, PersonController.getAllPersons);

module.exports = router;
