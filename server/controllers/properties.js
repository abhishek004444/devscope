const Property = require("../models/Property");

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ msg: "Property not found" });
    }

    res.json(property);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Property not found" });
    }
    res.status(500).send("Server Error");
  }
};

// @desc    Create a property
// @route   POST /api/properties
// @access  Public
// exports.createProperty = async (req, res) => {
//   try {
//     const newProperty = new Property(req.body);
//     const property = await newProperty.save();
//     res.json(property);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };

exports.createProperty = async (req, res) => {
  try {
    // Get other fields from req.body
    const { title, description, price, category } = req.body;

    // Get image path if uploaded
    const imagePath = req.file ? req.file.path : null;

    // Create new property with image
    const newProperty = new Property({
      title,
      description,
      price,
      category,
      image: imagePath, // store the image path
    });

    const property = await newProperty.save();
    res.json(property);
  } catch (err) {
    console.error(err.message);

    // If there's a file upload error, it might be in err.message
    if (err.message.includes("File type")) {
      return res
        .status(400)
        .json({ msg: "Please upload an image file (jpeg, jpg, png, gif)" });
    }

    res.status(500).send("Server Error");
  }
};

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Public
exports.updateProperty = async (req, res) => {
  try {
    // console.log("Body:", req.body); // text fields like title, price, etc.
    // console.log("File:", req.file); // uploaded image file

    const { title, description, price, category } = req.body;

    const updatedData = {
      title,
      description,
      price,
      category,
    };

    if (req.file) {
      updatedData.image = req.file.path; // or customize path if needed
    }

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!property) {
      return res.status(404).json({ msg: "Property not found" });
    }

    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Public
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ msg: "Property not found" });
    }

    await property.deleteOne();
    res.json({ msg: "Property removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Property not found" });
    }
    res.status(500).send("Server Error");
  }
};
