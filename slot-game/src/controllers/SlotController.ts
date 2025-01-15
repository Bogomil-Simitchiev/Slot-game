import { Request, Response } from "express";
import { Slot } from "../models/Slot";
const slotMachine = new Slot()

export const spinSlot = (req: Request, res: Response) => {
    try {
        const result = slotMachine.spin();
        
        console.log(result);    
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Error occurred' })
    }
}