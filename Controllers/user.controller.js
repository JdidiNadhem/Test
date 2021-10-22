// Import Models
const User = require("../Models/User");
const Contact = require("../Models/Contact");

const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");

// CONTROLLER REGISTER USER
exports.Register_user = async (req, res) => {
  try {
    // req.body {fullname,email,password}
    const user = req.body;
    // check if the email is not found in the database

    const userfound = await User.findOne({ email: user.email });

    if (userfound) {
      return res
        .status(400)
        .send({ errors: [{ msg: "User already registered!" }] });
    }

    const newuser = new User({
      ...user,
    });

    // Hash password
    const hashedpassword = bcrypt.hashSync(user.password, salt);
    newuser.password = hashedpassword;

    // create a token using json webtoken
    const token = jwt.sign(
      {
        id: newuser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "3h" }
    );
    // Save the User
    await newuser.save();
    res
      .status(200)
      .send({ msg: "User saved successfully", User: newuser, token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "can not save the User", error }] });
  }
};

// CONTROLLER LOGIN USER
exports.Login_user = async (req, res) => {
  try {
    // req.body email,password
    const { email, password } = req.body;

    // Check if user exist
    const finduser = await User.findOne({ email });

    if (!finduser) {
      res.status(400).send({ errors: [{ msg: "Bad Credential" }] });
      return;
    }
    // Check password
    const result = await bcrypt.compare(password, finduser.password);

    if (!result) {
      res.status(400).send({ errors: [{ msg: "Bad Credential" }] });
      return;
    }
    // if everything OK
    // create Token
    const token = jwt.sign(
      {
        id: finduser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "3h" }
    );
    // send the details + a token
    res
      .status(200)
      .send({ msg: "authentification success", User: finduser, token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "can not get the User", error }] });
  }
};

// CONTROLLER ADD CONTACT
exports.Add_contact = async (req, res) => {
  try {
    //  Get user from req.user
    const user = req.user;

    // Get user data from req.body
    const contact = req.body;

    // Find if Contact exist
    const findContact = await Contact.findOne({ email : contact.email });

    if (findContact) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Contact already exist" }] });
    }

    // Add Contact  
    const newcontact = new Contact({ user,...contact });
    await newcontact.save();

    res.status(200).send({ msg: "Contact added successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "can not add Contact", error }] });
  }
};

// CONTROLLER UPDATE CONTACT
exports.Update_contact = async (req, res) => {
  try {
    // Get contact data from req.body
    const contact  = req.body
    // Get contact id from req.params
    const {id} = req.params;
    // Find if Contact exist
    const findContact =  await Contact.findById(id);
    if (!findContact) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Contact not found" }] });
    }

    // Update Contact
await Contact.updateOne({_id:id},{$set:{...contact}});

    
    res.status(200).send({ msg: "Contact updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "can not update Contact", error }] });
  }
};


// CONTROLLER DELETE CONTACT
exports.Delete_contact = async (req, res) => {
  try {
    // Get contact id from req.params
    const {id} = req.params;
    // Find if Contact exist
    const findContact =  await Contact.findById(id);
    if (!findContact) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Contact not found" }] });
    }

    // Delete Contact
await Contact.deleteOne({_id:id});

    
    res.status(200).send({ msg: "Contact deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "can not delete Contact", error }] });
  }
};

// CONTROLLER GET CONTACTS
exports.Get_user_contacts = async (req, res) => {
  try {
    // Get user from req.user
    const user = req.user
    // Get user Contacts
    const findContacts = await Contact.find({user:user._id});

    res.status(200).send({ msg: "User Contacts",Contacts:findContacts});
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "can not get user contacts", error }] });
  }
};

// CONTROLLER GET CONTACT BY ID
exports.Get_user_contact_by_id = async (req, res) => {
  try {
  //  Get id Contact from req.params
  const {id} = req.params
    // Get user Contacts
    const findContact = await Contact.findOne({_id:id});
if(!findContact){
  return res.status(400).send({ errors: [{ msg: "can not get  contact"}] });
}
    res.status(200).send({ msg: "Contact",Contact:findContact});
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "can not get user contact", error }] });
  }
};

