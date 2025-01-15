"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SlotController_1 = require("../controllers/SlotController");
const router = express_1.default.Router();
router.get('/spin', SlotController_1.spinSlot);
exports.default = router;
