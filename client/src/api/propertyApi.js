import axios from "axios";

const API_URL = "http://localhost:5000/api/properties";

// Get all properties
export const getProperties = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get single property
export const getProperty = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create property
export const createProperty = async (propertyData) => {
  // console.log(propertyData)
  const response = await axios.post(API_URL, propertyData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Update property
export const updateProperty = async ({ id, propertyData }) => {
  const response = await axios.put(`${API_URL}/${id}`, propertyData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Delete property
export const deleteProperty = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};
