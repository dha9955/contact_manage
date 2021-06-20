const express = require("express");
const {
  createContact,
  getAllContacts,
  deleteContacts,
  getContactbyId,
  searchProductbyName,
  updateContactbyId
} = require("../controller/contact");
const router = express.Router();
const Contact = require("../model/contact");

//
router.delete("/delete",deleteContacts )

//
router.get("/get", getAllContacts)
router.get("/getcontactbyid/:contactId", getContactbyId)



router.post("/search", (req, res) => {
  
  console.log(req.body)

  const { fName , mName , lName } = req.body

  let fiName = fName ? fname : '' ;
  let miName = mName ? mName : '' ;
  let laName = lName ? lName : '' ;

  Contact.find({
    firstName: { $regex: fiName, $options: "$i" },
    middleName: { $regex: miName, $options: "$i" },
    lastName: { $regex: laName, $options: "$i" },
  })
  .then( (data) => res.status(200).json({ data }) );
  
})



//
router.patch("/updatecontactbyid", updateContactbyId)

//
router.post("/create", createContact);



module.exports = router;
