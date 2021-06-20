const Contact = require("../model/contact");
const User = require("../model/user");

// function createContacts(contacts, directManageId = null) {
//   const contactList = [];
//   let contact;
//   if (directManageId == null) {
//     contact = contacts.filter((cont) => cont.directManageId == undefined);
//   } else {
//     contact = contacts.filter((cont) => cont.directManageId == directManageId);
//   }

//   for (let ct of contact) {
//     contactList.push({
//       _id: ct._id,
//       userId: ct._id,
//       firstName: ct.firstName,
//       middleName: ct.middleName,
//       lastName: ct.lastName,
//       fullName: ct.fullName,
//       directManageId: ct.directManageId,
//       DOB: ct.DOB,
//       gender: ct.gender,
//       startDate: ct.startDate,
//       children: createContacts(contacts, ct._id),
//     });
//   }
//   return contactList;
// }



//
exports.createContact = (req, res) => {
  const contactObj =  {
    userId:req.body.userId,
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    DOB: req.body.DOB,
    gender: req.body.gender,
    startDate: req.body.startDate,
  }
  if(req.body.directManageId){
    contactObj.directManageId= req.body.directManageId
  }
  const cont = new Contact(contactObj)
  cont.save((error, contact)=>{
    if (error) return res.status(400).json({ error });
    if (contact) {
      return res.status(201).json({ contact });
    }
  })
};

//
exports.deleteContacts = async (req, res) => {
  const { ids } = req.body.payload;
  const deleteContacts = [];
  for (let i = 0; i < ids.length; i++) {
    const deleteContact = await Contact.findOneAndDelete({
      _id: ids[i]._id,
      userId: req.user._id,
    });
    deleteContacts.push(deleteContact);
  }

  if (deleteContacts.length == ids.length) {
    res.status(201).json({ message: "Categories removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};

//
exports.getAllContacts = (req, res) => {
  Contact.find({}).exec((error, contacts) => {
    if (error) {
      return res.status(400).json({ error });
    } 
    if(contacts) {
      res.status(200).json({ contacts });
    }
  });
};

//
exports.getContactbyId = (req, res) => {
  const contactId = req.params.contactId;
  if (contactId) {
    Contact.findOne({ _id: contactId }).exec((error, contact) => {
      if (error) return res.status(400).json({ error });
      if (contact) {
        const fullName = contact.fullName;
        res.status(200).json({ contact, fullName });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

//
exports.searchProductbyName = (req, res) => {
  const searchedField1 = req.query.firstName;
  const searchedField2 = req.query.middleName;
  const searchedField3 = req.query.lastName;
  Contact.find({
    firstName: { $regex: searchedField1, $options: "$i" },
    middleName: { $regex: searchedField2, $options: "$i" },
    lastName: { $regex: searchedField3, $options: "$i" },
  }).then((data) => {
    res.status(200).json({ data });
  });
};

//
exports.updateContactbyId = (req, res) => {
  Contact.findOne({ _id: req.body.contactId }).exec((error, contact) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (contact) {
      if (req.body.firstName) {
        contact.firstName = req.body.firstName;
      }
      if (req.body.middleName) {
        contact.middleName = req.body.middleName;
      }
      if (req.body.lastName) {
        contact.lastName = req.body.lastName;
      }
      if (req.body.directManageId) {
        contact.directManageId = req.body.directManageId;
      }
      if (req.body.DOB) {
        contact.DOB = req.body.DOB;
      }
      if (req.body.gender) {
        contact.gender = req.body.gender;
      }
      if (req.body.startDate) {
        contact.startDate = req.body.startDate;
      }
      contact.save().then(() => {
        return res.status(200).json({ contact });
      });
    }
  });
};
