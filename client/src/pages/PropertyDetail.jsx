import { useParams, Link } from 'react-router-dom';
import { useProperty } from '../hooks/useProperties';

export default function PropertyDetail() {
  const { id } = useParams();
  const { data: property, isLoading, isError } = useProperty(id);

  if (isLoading) {
    return <div className="text-center py-8">Loading property details...</div>;
  }

  if (isError || !property) {
    return <div className="text-center py-8 text-red-500">Error loading property</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link to="/" className="text-blue-500 hover:text-blue-700">
          &larr; Back to Properties
        </Link>
      </div>

      <div className="border rounded-lg p-6 shadow-md">
        {/* Property Image */}
        {property.image && (
          <div className="mb-6">
            <img
              src={"http://localhost:5000/"+property.image}
              alt={property.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}
        <h1 className="text-2xl font-bold mb-4">{property?.title}</h1>
        <p className="text-blue-600 font-bold text-xl mb-4">
          ${property.price.toLocaleString()}
        </p>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{property.description}</p>
        </div>

        <div className="flex space-x-4">
          <Link
            to={`/edit-property/${property._id}`}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Edit Property
          </Link>
        </div>
      </div>
    </div>
  );
}