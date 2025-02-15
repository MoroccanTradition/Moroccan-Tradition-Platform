import { useEffect, useState } from 'react';
import { fetchAnnouncements, createAnnouncement, deleteAnnouncement, fetchRiads } from '../../services/Api';

const ManageAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [riads, setRiads] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    description: '',
    date: '',
    riadId: '',
    imageUrl: ''
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const announcementsRes = await fetchAnnouncements();
        const riadsRes = await fetchRiads();
        setAnnouncements(announcementsRes.data);
        setRiads(riadsRes.data);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createAnnouncement({
        ...newAnnouncement,
        date: new Date(newAnnouncement.date).toISOString()
      });
      setAnnouncements([...announcements, data]);
      setNewAnnouncement({
        title: '',
        description: '',
        date: '',
        riadId: '',
        imageUrl: ''
      });
    } catch (error) {
      console.error('Error creating announcement:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAnnouncement(id);
      setAnnouncements(announcements.filter(a => a.id !== id));
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-6">Manage Announcements</h1>

      <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block font-medium">Title</label>
            <input
              type="text"
              value={newAnnouncement.title}
              onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Riad</label>
            <select
              value={newAnnouncement.riadId}
              onChange={(e) => setNewAnnouncement({...newAnnouncement, riadId: e.target.value})}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Riad</option>
              {riads.map(riad => (
                <option key={riad.id} value={riad.id}>{riad.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Date & Time</label>
            <input
              type="datetime-local"
              value={newAnnouncement.date}
              onChange={(e) => setNewAnnouncement({...newAnnouncement, date: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Image URL</label>
            <input
              type="url"
              value={newAnnouncement.imageUrl}
              onChange={(e) => setNewAnnouncement({...newAnnouncement, imageUrl: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <label className="block font-medium">Description</label>
          <textarea
            value={newAnnouncement.description}
            onChange={(e) => setNewAnnouncement({...newAnnouncement, description: e.target.value})}
            className="w-full p-2 border rounded h-32"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Create Announcement
        </button>
      </form>

      <div className="space-y-4">
        {announcements.map(announcement => (
          <div key={announcement.id} className="border p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{announcement.title}</h3>
                <p className="text-gray-600 mt-2">{announcement.description}</p>
                <div className="mt-2 text-sm text-gray-500">
                  <p>Riad: {riads.find(r => r.id === announcement.riadId)?.name || 'Unknown'}</p>
                  <p>Date: {new Date(announcement.date).toLocaleString()}</p>
                  {announcement.imageUrl && (
                    <img 
                      src={announcement.imageUrl} 
                      alt={announcement.title}
                      className="mt-2 h-32 object-cover rounded"
                    />
                  )}
                </div>
              </div>
              <button
                onClick={() => handleDelete(announcement.id)}
                className="text-red-500 hover:text-red-700 ml-4"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {announcements.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No announcements found
        </div>
      )}
    </div>
  );
};

export default ManageAnnouncements;