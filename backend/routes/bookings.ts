import { Router, Request, Response } from 'express'
import fs from 'fs'
import { get } from 'http';
import path from 'path'

const router = Router()

const bookingsFile = path.join(__dirname, '../data/bookings.json');

const getBookings = () => {
    if (!fs.existsSync(bookingsFile)) return [];
    const data = fs.readFileSync(bookingsFile, 'utf8');
    return JSON.parse(data);
}

const saveBookings = (bookings: any[]) => {
    fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2));
}

// GET all bookings
router.get('/', (req: Request, res: Response) => {
    const bookings = getBookings();
    res.json(bookings);
})


// POST a new booking
router.post('/', (req: Request, res: Response) => {
    const { firstname, lastname, email, phone, checkin, checkout, roomID } = req.body;

    if (!firstname || !lastname || !email || !phone || !checkin || !checkout || !roomID) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const bookings = getBookings();
    const newBooking = {
        id: Date.now(),
        firstname,
        lastname,
        email,
        phone,
        checkin,
        checkout,
        roomID
    };

    bookings.push(newBooking);
    saveBookings(bookings);
    res.status(201).json(newBooking);
})

// DELETE a booking
router.delete('/:id', (req: Request, res: Response) => {
    const bookings = getBookings();
    const filtered = bookings.filter((b: any) => b.id !== Number(req.params.id));
    saveBookings(filtered);
    res.status(204).send();
});

export default router;