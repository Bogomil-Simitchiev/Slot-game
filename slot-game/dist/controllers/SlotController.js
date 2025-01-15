"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spinSlot = void 0;
const Slot_1 = require("../models/Slot");
const slotMachine = new Slot_1.Slot();
const spinSlot = (req, res) => {
    try {
        const result = slotMachine.spin();
        console.log(result);
        res.status(200).json(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Error occurred' });
    }
};
exports.spinSlot = spinSlot;
