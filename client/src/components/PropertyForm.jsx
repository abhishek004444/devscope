import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function PropertyForm({ 
  initialData = {}, 
  isLoading = false, 
  onSubmit, 
  buttonText = 'Submit' 
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: null // Changed to null for single image
  });

  const [previewImage, setPreviewImage] = useState(null); // Changed for single image
  const [errors, setErrors] = useState({});

  // Initialize form with initialData when it changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        price: initialData.price || '',
        category: initialData.category || '',
        image: initialData.image || null
      });
      
      if (initialData.image) {
        // Handle both string URLs and File objects
        if (Array.isArray(initialData.image) && initialData.image.length > 0) {
          const img = initialData.image[0];
          setPreviewImage(typeof img === 'string' ? `http://localhost:5000/${img}` : URL.createObjectURL(img));
        } else if (typeof initialData.image === 'string') {
          setPreviewImage(`http://localhost:5000/${initialData.image}`);
        }
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get only the first file
    
    if (!file) return;
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        image: 'Only JPG, PNG, GIF, or WEBP images are allowed'
      }));
      return;
    }
    
    // Clear any previous errors
    setErrors(prev => ({
      ...prev,
      image: ''
    }));
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    
    // Clear previous preview if exists
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
    
    setPreviewImage(previewUrl);
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      image: file
    }));
  };

  const removeImage = () => {
    // Revoke object URL if it exists
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
    
    setPreviewImage(null);
    setFormData(prev => ({
      ...prev,
      image: null
    }));
    
    // Clear file input
    const fileInput = document.querySelector('input[name="image"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (isNaN(formData.price)) newErrors.price = 'Price must be a number';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.image) newErrors.image = 'An image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const propertyData = new FormData();
    propertyData.append('title', formData.title);
    propertyData.append('description', formData.description);
    propertyData.append('price', Number(formData.price));
    propertyData.append('category', formData.category);
    
    // Append the image file if it's new (not a string URL)
    if (formData.image && typeof formData.image !== 'string') {
      propertyData.append('image', formData.image);
    }

    onSubmit(propertyData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full border rounded p-2 ${errors.title ? 'border-red-500' : ''}`}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>
      
      <div>
        <label className="block text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded p-2"
          rows="3"
        />
      </div>
      
      <div>
        <label className="block text-gray-700">Price ($)</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className={`w-full border rounded p-2 ${errors.price ? 'border-red-500' : ''}`}
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
      </div>
      
      <div>
        <label className="block text-gray-700">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`w-full border rounded p-2 ${errors.category ? 'border-red-500' : ''}`}
        >
          <option value="">Select a category</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Villa">Villa</option>
          <option value="Condo">Condo</option>
          <option value="Land">Land</option>
          <option value="Commercial">Commercial</option>
        </select>
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
      </div>
      
      <div>
        <label className="block text-gray-700">Image</label>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          accept="image/*"
          className={`w-full border rounded p-2 ${errors.image ? 'border-red-500' : ''}`}
        />
        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
        
        {/* Image preview */}
        {previewImage && (
          <div className="mt-4 relative group">
            <img 
              src={previewImage} 
              alt="Preview"
              className="w-full h-64 object-contain rounded"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        )}
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full disabled:bg-blue-300"
      >
        {isLoading ? 'Processing...' : buttonText}
      </button>
    </form>
  );
}

PropertyForm.propTypes = {
  initialData: PropTypes.object,
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
};