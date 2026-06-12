import { useEffect, useState } from 'react';
import axios from 'axios';

interface Booking {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  checkin: string;
  checkout: string;
  roomID: number;
}

function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    axios.get('http://localhost:5000/api/bookings')
      .then(res => {
        setBookings(res.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:5000/api/bookings/${id}`)
      .then(() => fetchBookings());
  };

  if (loading) return <p style={{ padding: '2rem' }}>Loading bookings...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Admin Panel</h2>

      {bookings.length === 0 ? (
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
                  borderRadius: '4px',
                  cursor: 'pointer'
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