import { useEffect, useState } from 'react';
import { fetchRiads } from '../services/Api';

const Riads = () => {
  const [riads, setRiads] = useState([]);

  useEffect(() => {
    const loadRiads = async () => {
      try {
        const { data } = await fetchRiads();
        setRiads(data);
      } catch (error) {
        console.error('Error loading riads:', error);
      }
    };
    loadRiads();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {riads.map(riad => (
        <div key={riad.id} className="border rounded-lg p-4 shadow-md">
          <img 
            src={riad.imageUrl || '/placeholder-riad.jpg'} 
            alt={riad.name}
            className="h-48 w-full object-cover mb-4 rounded-lg"
          />
          <h3 className="text-xl font-semibold mb-2">{riad.name}</h3>
          <p className="text-gray-600 mb-2">{riad.address}</p>
          <p className="text-sm text-gray-500">Capacity: {riad.capacity} people</p>
        </div>
      ))}
    </div>
  );
};

export default Riads;