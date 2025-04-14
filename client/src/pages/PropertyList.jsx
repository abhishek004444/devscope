import { Link } from 'react-router-dom';
import { useProperties } from '../hooks/useProperties';
import PropertyRow from '../components/PropertyRow';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../features/properties/propertySlice';

export default function PropertyList() {
  const { data: properties = [], isLoading, isError, error } = useProperties();
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.properties.filters);
  const selectedCategory = filters.category || 'all';

  const categories = ['all', 'Apartment', 'House', 'Villa', 'Condo', 'Land', 'Commercial'];

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    dispatch(setFilters({ category: category === 'all' ? '' : category }));
  };

  const filteredProperties = selectedCategory === 'all' 
    ? properties 
    : properties.filter(property => property.category === selectedCategory);

  if (isLoading) {
    return <div className="text-center py-8">Loading properties...</div>;
  }

  if (isError) {
    return <div className="text-red-500 text-center py-8">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Properties</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <label htmlFor="category-filter" className="mr-2 text-gray-700">Filter by:</label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="border rounded px-3 py-2"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <Link
            to="/add-property"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Property
          </Link>
        </div>
      </div>

      {filteredProperties.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {selectedCategory === 'all' 
              ? "No properties found. Add your first property!" 
              : `No properties found in ${selectedCategory} category.`}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border">Image</th>
                <th className="py-2 px-4 border">Title</th>
                <th className="py-2 px-4 border">Description</th>
                <th className="py-2 px-4 border">Price</th>
                <th className="py-2 px-4 border">Category</th>
                <th className="py-2 px-4 border">Created At</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.map(property => (
                <PropertyRow key={property._id} property={property} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}