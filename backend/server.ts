import express from 'express'
import cors from 'cors'
import bookingRoutes from './routes/bookings'
import roomRoutes from './routes/rooms'
import authRoutes from './routes/auth';

const app = express()
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/bookings', bookingRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});