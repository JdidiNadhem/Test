const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User Schema
const contactSchema = new Schema({
  user: { type: Schema.Types.ObjectId, require: true, ref: "user" },

  fullname: {
    require: true,
    type: String,
  },
  age: {
    require: true,
    type: Number,
  },
  phone: {
    require: true,
    type: String,
  },
  email: {
    require: true,
    type: String,
  },
});

module.exports = Contact = mongoose.model("contact", contactSchema);
