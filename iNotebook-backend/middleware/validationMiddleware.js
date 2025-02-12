const { body, validationResult } = require("express-validator");

// Generic function to create validation rules dynamically
const validationRules = (type) => {
  const rules = [];

  if (type === "register") {
    rules.push(
      body("name").notEmpty().withMessage("Name is required.")
        .isLength({ min: 4 }).withMessage("Must be at least 4 characters."),
      body("email").isEmail().withMessage("Invalid Email!"),
      body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters.")
    );
  }

  if (type === "login") {
    rules.push(
      body("email").isEmail().withMessage("Invalid Email!"),
      body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters.")
    );
  }

  if (type === "notes") {
    rules.push(
      body("title").isLength({ min: 4 }).withMessage("Enter a valid Title (At least 4 characters)."),
      body("description").isLength({ min: 5 }).withMessage("Description must be at least 5 characters.")
    );
  }

  return rules;
};

// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = { validationRules, validate };
