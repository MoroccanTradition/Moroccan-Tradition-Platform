import { useState, useEffect } from 'react';
import { fetchRiads, createRiad, deleteRiad } from '../../services/Api';

const ManageRiads = () => {
  const [riads, setRiads] = useState([]);
  const [newRiad, setNewRiad] = useState({
    name: '',
    address: '',
    description: '',
    capacity: ''
  });

  useEffect(() => {
    const loadRiads = async () => {
      const { data } = await fetchRiads();
      setRiads(data);
    };
    loadRiads();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await createRiad(newRiad);
    setRiads([...riads, data]);
    setNewRiad({ name: '', address: '', description: '', capacity: '' });
  };

  const handleDelete = async (id) => {
    await deleteRiad(id);
    setRiads(riads.filter(riad => riad.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Manage Riads</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={newRiad.name}
          onChange={(e) => setNewRiad({ ...newRiad, name: e.target.value })}
          className="w-full p-2 border"
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={newRiad.address}
          onChange={(e) => setNewRiad({ ...newRiad, address: e.target.value })}
          className="w-full p-2 border"
          required
        />
        <textarea
          placeholder="Description"
          value={newRiad.description}
          onChange={(e) => setNewRiad({ ...newRiad, description: e.target.value })}
          className="w-full p-2 border"
          required
        />
        <input
          type="number"
          placeholder="Capacity"
          value={newRiad.capacity}
          onChange={(e) => setNewRiad({ ...newRiad, capacity: e.target.value })}
          className="w-full p-2 border"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Add Riad
        </button>
      </form>

      <div className="space-y-4">
        {riads.map(riad => (
          <div key={riad.id} className="border p-4 rounded-lg">
            <h3 className="text-xl font-semibold">{riad.name}</h3>
            <p className="text-gray-600">{riad.address}</p>
            <div className="mt-2">
              <button className="mr-2 text-blue-500">Edit</button>
              <button 
                onClick={() => handleDelete(riad.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRiads;