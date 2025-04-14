const express = require("express");
const router = express.Router();
const {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/properties");
const upload = require('../middlewares/upload');

// Get all properties
router.get("/", getProperties);

// Create a new property
router.post("/",upload, createProperty);

// Get a single property by ID
router.get("/:id", getProperty);

// Update a property by ID
router.put("/:id", upload, updateProperty);

// Delete a property by ID
router.delete("/:id", deleteProperty);

module.exports = router;
