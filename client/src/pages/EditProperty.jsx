import { useNavigate, useParams } from 'react-router-dom';
import { useProperty, useUpdateProperty } from '../hooks/useProperties';
import PropertyForm from '../components/PropertyForm';

export default function EditProperty() {
  const { id } = useParams();
  const { data: property, isLoading: isPropertyLoading, isError } = useProperty(id);
  const { mutate: updateProperty, isLoading: isUpdating } = useUpdateProperty();
  const navigate = useNavigate();

  const handleSubmit = (propertyData) => {
    updateProperty({ id, propertyData }, {
      onSuccess: () => {
        navigate(`/property/${id}`);
      },
      onError: (error) => {
        console.error('Failed to update property:', error);
        alert('Failed to update property. Please try again.');
      }
    });
  };

  if (isPropertyLoading) {
    return <div className="text-center py-8">Loading property details...</div>;
  }

  if (isError) {
    return <div className="text-center py-8 text-red-500">Error loading property</div>;
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Property</h1>
      <PropertyForm 
        initialData={property}
        onSubmit={handleSubmit}
        isLoading={isUpdating}
        buttonText="Update Property"
      />
    </div>
  );
}