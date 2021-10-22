const { validationResult, check } = require("express-validator");

// Register Validation middleware
exports.registerValidation = () => [
  check("fullname", "Fullname is required").not().isEmpty(),
  check("fullname", "Fullname must have more than 6 caracters").isLength({
    min: 6,
  }),

  check("email", "Email is required").not().isEmpty(),
  check("email", "Enter a valid email").isEmail(),

  check("password", "Password is required").not().isEmpty(),
  check("password", "password must have more than 8 caracters").isLength({
    min: 8,
  }),
];

// Login Validation middleware
exports.loginValidation = () => [
  check("email", "Email is required").not().isEmpty(),
  check("email", "Enter a valid email").isEmail(),

  check("password", "Password is required").not().isEmpty(),
];

//   Contact Validation middleware
exports.ContactValidation = () => [
  check("fullname", "Fullname is required").not().isEmpty(),

  check("age", "Age is required").not().isEmpty(),
  check("age", "Age must be 10 years or more").isInt({min:10}),
 
  check("phone", "Phone is required").not().isEmpty(),
  check("phone", "Phone must have  8 caracters").isLength({
    min: 8,
    max: 8,
  }),

  check("email", "Email is required").not().isEmpty(),
  check("email", "Enter a valid email").isEmail(),
];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
