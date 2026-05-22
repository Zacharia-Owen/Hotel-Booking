import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav style={{
            backgroundColor: '#2c3e50',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <Link to="/" style={{ color: 'whitesmoke', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Book a Room
            </Link>
            <Link to="/admin" style={{ color: 'whitesmoke', textDecoration: 'none' }}>
            Admin
            </Link>
        </nav>
    )
}

export default Navbar