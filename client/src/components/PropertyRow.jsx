import { Link } from 'react-router-dom';
import { useDeleteProperty } from '../hooks/useProperties';

const PropertyRow = ({ property }) => {
  const { mutate: deleteProperty } = useDeleteProperty();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      deleteProperty(property._id);
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="py-2 px-4 border">
        {property.image && property.image.length > 0 ? (
          <img
            src={`http://localhost:5000/${property.image}`}
            alt={property.title}
            className="w-16 h-16 object-cover rounded"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </td>
      <td className="py-2 px-4 border">{property.title}</td>
      <td className="py-2 px-4 border">{property.description || '-'}</td>
      <td className="py-2 px-4 border">${property.price.toLocaleString()}</td>
      <td className="py-2 px-4 border">{property.category}</td>
      <td className="py-2 px-4 border">
        {new Date(property.createdAt).toLocaleDateString()}
      </td>
      <td className="py-2 px-4 border">
        <div className="flex space-x-2">
          <Link
            to={`/property/${property._id}`}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
          >
            View
          </Link>
          <Link
            to={`/edit-property/${property._id}`}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default PropertyRow;