import express from 'express'
import cors from 'cors'
import bookingRoutes from './routes/bookings'
import roomRoutes from './routes/rooms'

const app = express()
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/bookings', bookingRoutes);
app.use('/api/rooms', roomRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});