const express = require("express");
const router = express.Router();

// Import Controllers
const {
  Register_user,
  Login_user,
  Add_contact,
  Update_contact,
  Delete_contact,
  Get_user_contacts,
  Get_user_contact_by_id
} = require("../Controllers/user.controller");

// Import isAuth middleware
const { isAuthUser } = require("../Middleware/user.auth.jwt");

// Import Validation middlewares
const {
  registerValidation,
  validation,
  loginValidation,
  ContactValidation,
} = require("../Middleware/userValidation");

// @Desc: REGISTER
// @Method: POST
// @PATH: /api/user/register
// DATA : fullname,email,password

router.post("/register", registerValidation(), validation, Register_user);

// @Desc: LOGIN
// @Method: POST
// @PATH: /api/user/login
// DATA : email,password

router.post("/login", loginValidation(), validation, Login_user);

// @Desc: ADD CONTACT
// @Method: POST
// @PATH: /api/user/addContact
// DATA : req.body{fullname,age,phone,email}, req.Headers{token}

router.post("/addContact",isAuthUser, ContactValidation(), validation, Add_contact);

// @Desc: UPDATE CONTACT
// @Method: PUT
// @PATH: /api/user/updateContact/:id
// DATA : req.body{fullname,age,phone,email}, req.Headers{token} , req.params {id}

router.put("/updateContact/:id",isAuthUser, ContactValidation(), validation,Update_contact);

// @Desc: DELETE CONTACT
// @Method: DELETE
// @PATH: /api/user/deleteContact/:id
// DATA : req.params{id} , req.Headers{token}

router.delete("/deleteContact/:id",isAuthUser,Delete_contact);

// @Desc: GET USER CONTACTS
// @Method: GET
// @PATH: /api/user/userContacts 
// DATA :req.Headers{token}

router.get("/userContacts",isAuthUser,Get_user_contacts);

// @Desc: GET USER CONTACT BY ID
// @Method: GET
// @PATH: /api/user/userContactById/:id 
// DATA :req.params{id}

router.get("/userContactById/:id",isAuthUser,Get_user_contact_by_id);
 
module.exports = router;
