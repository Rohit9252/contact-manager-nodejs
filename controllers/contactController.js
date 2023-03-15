//@desc get all Contacts
//@route GET /api/v1/contacts
//@access Public
const getAllContact = (req, res) => {
    res.status(200).json({message: 'Hello World!'});
}


//@desc craete new Contact
//@route Post /api/v1/contacts
//@access Public
const createContact = (req, res) => {
    res.status(201).json({message: 'Hello create contact!'});
}

//@desc get Contact
//@route Get /api/v1/contacts/:id
//@access Public
const getContact = (req, res) => {
    res.status(200).json({message: `Detail contact  for ${req.params.id} `});
}

//@desc update Contact
//@route Put /api/v1/contacts/:id
//@access Public
const updateContact =(req, res) => {
    res.status(200).json({message: `update contact  for ${req.params.id} `});
}


//@desc delete Contact
//@route Delete /api/v1/contacts/:id
//@access Public
const deleteContact = (req, res) => {
    res.status(200).json({message: `delete contact  for ${req.params.id} `});
}




module.exports = {
    getAllContact,
    createContact,
    getContact,
    updateContact,
    deleteContact
}