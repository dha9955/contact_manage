const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
    directManageId: {
      type:"String"
    },
    DOB: {
      type: Date,
    },
    gender: {
      type: Boolean,
    },
    startDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

contactSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.middleName} ${this.lastName}`;
});

module.exports = mongoose.model("Contact", contactSchema);
