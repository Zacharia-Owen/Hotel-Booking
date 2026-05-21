import { Router, Request, Response } from 'express'
import path from 'path'
import fs from 'fs'

const router = Router();

router.get('/', (req: Request, res: Response) => {
    const roomsFile = path.join(__dirname, '../data/rooms.json')
    const data = fs.readFileSync(roomsFile, 'utf-8')
    res.json(JSON.parse(data))
});

export default router;