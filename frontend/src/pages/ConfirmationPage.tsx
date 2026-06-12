import { useLocation, useNavigate } from 'react-router-dom';

interface Booking {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    checkin: string;
    checkout: string;
    roomId: number;
}

function ConfirmationPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const booking: Booking = location.state?.booking;

    if (!booking) {
        return (
            <div style={{ padding: '2rem' }}>
                <p>No booking found.</p>
                <button onClick={() => navigate('/')}>Back to Home</button>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <div data-testid="confirmation-modal" style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '2rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                <h2 style={{ marginBottom: '0.5rem' }}>Booking Confirmed!</h2>
                <p data-testid="booking-id" style={{
                    backgroundColor: '#f5f5f5',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    display: 'inline-block',
                    marginBottom: '1.5rem',
                    fontFamily: 'monospace',
                    fontSize: '1.1rem'
                }}>
                    Booking ID: #{booking.id}
                </p>
                <div style={{ textAlign: 'left', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                    <p><strong>Name:</strong> {booking.firstname} {booking.lastname}</p>
                    <p><strong>Email:</strong> {booking.email}</p>
                    <p><strong>Phone:</strong> {booking.phone}</p>
                    <p><strong>Check-in:</strong> {booking.checkin}</p>
                    <p><strong>Check-out:</strong> {booking.checkout}</p>
                </div>
                <button
                    data-testid="back-home"
                    onClick={() => navigate('/')}
                    style={{
                        marginTop: '1.5rem',
                        padding: '0.75rem 2rem',
                        backgroundColor: '#2c3e50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '1rem'
                    }}>
                    Back to Home
                </button>
            </div>
        </div>
    );
}

export default ConfirmationPage;