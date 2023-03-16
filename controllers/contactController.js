const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
//@desc get all Contacts
//@route GET /api/v1/contacts
//@access Public
const getAllContact = asyncHandler(async (req, res) => {

    const contacts = await Contact.find({});
    res.status(200).json(contacts);
});


//@desc craete new Contact
//@route Post /api/v1/contacts
//@access Public
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        return res.status(400)  //.json({message: 'Please enter all fields'})
        throw new Error('Please enter all fields');
    }


    const contact = await Contact.create({
        name,
        email,
        phone
    });


    res.status(201).json(contact);
});

//@desc get Contact
//@route Get /api/v1/contacts/:id
//@access Public
const getContact = asyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }

    res.status(200).json(contact);

});

//@desc update Contact
//@route Put /api/v1/contacts/:id
//@access Public
const updateContact = asyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedContact);
});


//@desc delete Contact
//@route Delete /api/v1/contacts/:id
//@access Public
const deleteContact = asyncHandler(async (req, res) => {


    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }

    const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json(deletedContact);
});




module.exports = {
    getAllContact,
    createContact,
    getContact,
    updateContact,
    deleteContact
}