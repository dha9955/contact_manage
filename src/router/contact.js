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

//
router.delete("/delete",deleteContacts )

//
router.get("/get", getAllContacts)
router.get("/getcontactbyid/:contactId", getContactbyId)
router.get("/search", searchProductbyName)

//
router.patch("/updatecontactbyid", updateContactbyId)

//
router.post("/create", createContact);



module.exports = router;
