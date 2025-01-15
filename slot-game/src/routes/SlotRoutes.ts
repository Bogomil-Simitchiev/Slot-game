import express from 'express';
import { spinSlot } from '../controllers/SlotController';

const router = express.Router();

router.get('/spin', spinSlot);

export default router;