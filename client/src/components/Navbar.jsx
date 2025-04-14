import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">Property Manager</Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-blue-200">Home</Link>
          <Link to="/add-property" className="text-white hover:text-blue-200">Add Property</Link>
        </div>
      </div>
    </nav>
  );
}