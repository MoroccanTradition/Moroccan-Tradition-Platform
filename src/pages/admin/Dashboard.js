import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Welcome, {user?.firstName}</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl mb-2">Account Information</h2>
          <p>Email: {user?.email}</p>
          <p>Address: {user?.address}</p>
          <p>Phone: {user?.phone}</p>
        </div>
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl mb-2">Recent Orders</h2>
          {/* Add order history component here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;