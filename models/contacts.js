const { Contact } = require('./modelContacts');

const listContacts = async () => {
  try {
    const contacts = await Contact.find({});
    return contacts;
  } catch (error) {
    console.log(error);
  } 
}

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findOne({ _id: contactId });
    return contact;
  } catch (error) {
    console.log(error);
  }
}


const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    await Contact.findOneAndRemove({ _id: contactId });
    return contacts;  
  } catch (error) {
    console.log(error);    
  }
}

const addContact = async (body) => {
  try {
    const { name, email, phone, favorite } = body;
    const newContact = await Contact.create({
      name,
      email,
      phone,
      favorite
    });
    return newContact;
  } catch (error) {
    console.log(error); 
  }
}

const updateContact = async (contactId, body) => { 
  try {
    const { name, email, phone, favorite } = body;
    const updatedContact = {};

    if (updatedContact.name !== name) {
      if (name) {
        updatedContact.name = name;
      }
    }
    
    if (updatedContact.email !== email) {
      if (email) {
        updatedContact.email = email;
      }
    }
    
    if (updatedContact.phone !== phone) {
      if (phone) {
        updatedContact.phone = phone;
      }
    }
    
    if (updatedContact.favorite !== favorite) {
      if (favorite !== undefined) {
        updatedContact.favorite = favorite;        
      }
    }
    
    const contact = await Contact.findOneAndUpdate( { _id: contactId }, updatedContact, {new: true} );
    return contact;
  } catch (error) {
    console.log(error); 
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
