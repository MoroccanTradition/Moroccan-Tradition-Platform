import { useEffect, useState } from 'react';
import { fetchAnnouncements } from '../services/Api';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        const { data } = await fetchAnnouncements();
        setAnnouncements(data);
      } catch (error) {
        console.error('Error loading announcements:', error);
      } finally {
        setLoading(false);
      }
    };
    loadAnnouncements();
  }, []);

  if (loading) return <div className="text-center p-8">Loading announcements...</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Cultural Events & Announcements</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {announcements.map(announcement => (
          <div key={announcement.id} className="border rounded-lg shadow-lg overflow-hidden">
            <img 
              src={announcement.imageUrl || '/placeholder-announcement.jpg'} 
              alt={announcement.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{announcement.title}</h2>
              <p className="text-gray-600 mb-3">{announcement.description}</p>
              
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div>
                  <p className="font-medium">Riad:</p>
                  <p>{announcement.riad?.name || 'Traditional Moroccan Riad'}</p>
                </div>
                <div>
                  <p className="font-medium">Date:</p>
                  <p>{new Date(announcement.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {announcements.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No upcoming announcements at the moment. Check back later!
        </div>
      )}
    </div>
  );
};

export default Announcements;