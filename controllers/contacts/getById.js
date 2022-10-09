const { Contact } = require('../../models/modelContacts');

const getContactById = async (userFromReq, contactId) => {
  try {
    const { _id: owner } = userFromReq;    
    const contact = await Contact.findOne({ _id: contactId, owner});
    return contact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getContactById,
}
