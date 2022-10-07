const { Contact } = require('../../models/modelContacts');

const updateStatus = async (contactId, req) => { 
  try {
    const { favorite } = req.body;

    if (favorite !== undefined) {
      const contact = await Contact.findOneAndUpdate( { _id: contactId }, {favorite}, {new: true} );
      return contact;      
    }
    
  } catch (error) {
    console.log(error); 
  }
}


module.exports = {
    updateStatus,
}
