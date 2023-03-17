const express = require('express');
const router = express.Router();
const {
    getAllContact,
    createContact,
    getContact,
    updateContact,
    deleteContact
} = require('../controllers/contactController');
const valiadateToken = require('../middleware/validateTokenHandler');




router.use(valiadateToken);
router.route('/').get(getAllContact).post(createContact);
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);


module.exports = router;