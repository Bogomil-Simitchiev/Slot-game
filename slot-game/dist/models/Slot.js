"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slot = void 0;
const configuration_1 = __importDefault(require("../config/configuration"));
class Slot {
    constructor() {
        this.reels = configuration_1.default.reels;
        this.lines = configuration_1.default.lines;
        this.symbols = configuration_1.default.symbols;
    }
    getSymbols(positions) {
        return positions.map((position, reelIndex) => {
            const reel = this.reels[reelIndex];
            return [
                reel[position],
                reel[(position + 1) % reel.length],
                reel[(position + 2) % reel.length],
            ];
        });
    }
    countVerticalMatches(displayedSymbols) {
        const verticalCounts = {};
        this.lines.forEach((line, lineIndex) => {
            verticalCounts[lineIndex] = {};
            line.forEach((row, reelIndex) => {
                const symbol = displayedSymbols[reelIndex][row];
                verticalCounts[lineIndex][symbol] = (verticalCounts[lineIndex][symbol] || 0) + 1;
            });
        });
        return verticalCounts;
    }
    calculatePayouts(displayedSymbols) {
        const verticalMatches = this.countVerticalMatches(displayedSymbols);
        const payouts = [];
        this.lines.forEach(() => payouts.push(0));
        for (let lineIndex in verticalMatches) {
            const lineMatchCounts = verticalMatches[lineIndex];
            let linePayout = 0;
            for (let symbol in lineMatchCounts) {
                const matchCount = lineMatchCounts[symbol];
                if (matchCount >= 3) {
                    linePayout = this.symbols[symbol][matchCount - 1];
                }
            }
            if (linePayout > 0) {
                payouts[parseInt(lineIndex)] = linePayout;
            }
        }
        const totalPayout = payouts.reduce((acc, payout) => acc + payout, 0);
        return { payouts, totalPayout };
    }
    spin() {
        const positions = this.reels.map(reel => Math.floor(Math.random() * reel.length));
        const displayedSymbols = this.getSymbols(positions);
        const { payouts, totalPayout } = this.calculatePayouts(displayedSymbols);
        return {
            positions,
            symbols: displayedSymbols,
            payouts,
            totalPayout,
        };
    }
}
exports.Slot = Slot;
