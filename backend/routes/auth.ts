import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = Router();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(
    process.env.ADMIN_PASSWORD || "admin123",
    10
);

router.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: "Username and password are required." });
        return;
    }

    const usernameMatch = username === ADMIN_USERNAME;
    const passwordMatch = bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);

    if (!usernameMatch || !passwordMatch) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
    }

    const token = jwt.sign(
        { username },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '8h' }
    );

    res.json({ token });
});

export default router;