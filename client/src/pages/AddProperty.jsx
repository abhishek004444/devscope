import { useNavigate } from 'react-router-dom';
import { useCreateProperty } from '../hooks/useProperties';
import PropertyForm from '../components/PropertyForm';

export default function AddProperty() {
  const navigate = useNavigate();
  const { mutate: createProperty, isLoading } = useCreateProperty();

  const handleSubmit = (propertyData) => {
    createProperty(propertyData, {
      onSuccess: () => {
        navigate('/');
      },
      onError: (error) => {
        console.error('Failed to create property:', error);
        alert('Failed to create property. Please try again.');
      }
    });
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Property</h1>
      <PropertyForm 
        onSubmit={handleSubmit}
        isLoading={isLoading}
        buttonText="Add Property"
      />
    </div>
  );
}