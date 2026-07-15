import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

interface Booking {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  checkin: string;
  checkout: string;
  room_id: number;
}

function AdminPage() {
  const [token, setToken] = useState<string>(
    localStorage.getItem('admin_token') || ''
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        username,
        password
      });
      const newToken = response.data.token;
      setToken(newToken);
      localStorage.setItem('admin_token', newToken);
      setLoginError('');
    } catch {
      setLoginError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('admin_token');
    setBookings([]);
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data);
    } catch {
      setLoginError('Session expired. Please log in again.');
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBookings();
    } catch {
      alert('Failed to delete booking. Your session may have expired.');
      handleLogout();
    }
  };

  useEffect(() => {
    if (token) fetchBookings();
  }, [token]);

  if (!token) {
    return (
      <div style={{ padding: '2rem', maxWidth: '400px', margin: '2rem auto' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Admin Login</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            data-testid="admin-username"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            data-testid="admin-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          {loginError && (
            <p data-testid="login-error" style={{ color: 'red' }}>{loginError}</p>
          )}
          <button
            data-testid="login-button"
            onClick={handleLogin}
            style={{
              padding: '0.75rem',
              backgroundColor: '#2c3e50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem'
            }}>
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Admin Panel</h2>
        <button
          data-testid="logout-button"
          onClick={handleLogout}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}>
          Logout
        </button>
      </div>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p data-testid="no-bookings">No bookings yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {bookings.map(booking => (
            <div key={booking.id} data-testid="booking-card" style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p><strong>{booking.firstname} {booking.lastname}</strong></p>
                <p style={{ color: '#666' }}>{booking.email} · {booking.phone}</p>
                <p style={{ color: '#666' }}>Check-in: {booking.checkin} → Check-out: {booking.checkout}</p>
                <p style={{ fontSize: '0.85rem', color: '#999' }}>Booking ID: #{booking.id}</p>
              </div>
              <button
                data-testid="delete-booking"
                onClick={() => handleDelete(booking.id)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px'
                }}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPage;