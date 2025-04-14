import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddProperty from './pages/AddProperty';
import EditProperty from './pages/EditProperty';
import PropertyDetail from './pages/PropertyDetail';
import PropertyList from './pages/PropertyList';

function App() {
  return (
    <div className="mx-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<PropertyList />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/edit-property/:id" element={<EditProperty />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
      </Routes>
    </div>
  );
}

export default App;