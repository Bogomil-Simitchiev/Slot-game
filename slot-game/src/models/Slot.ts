import configFile from '../config/configuration';
import { ISlotResult, ISymbolConfig } from '../interfaces/Slot';

export class Slot {
    private reels: number[][];
    private lines: number[][];
    private symbols: ISymbolConfig;

    constructor() {
        this.reels = configFile.reels;
        this.lines = configFile.lines;
        this.symbols = configFile.symbols;
    }

    private getSymbols(positions: number[]): number[][] {
        return positions.map((position, reelIndex) => {
            const reel = this.reels[reelIndex];
            return [
                reel[position],
                reel[(position + 1) % reel.length],
                reel[(position + 2) % reel.length],
            ];
        });
    }

    private countVerticalMatches(displayedSymbols: number[][]): { [lineIndex: number]: { [symbol: number]: number } } {
        const verticalCounts: { [lineIndex: number]: { [symbol: number]: number } } = {};

        this.lines.forEach((line, lineIndex) => {
            verticalCounts[lineIndex] = {};

            line.forEach((row, reelIndex) => {
                const symbol = displayedSymbols[reelIndex][row];
                verticalCounts[lineIndex][symbol] = (verticalCounts[lineIndex][symbol] || 0) + 1;
            });
        });

        return verticalCounts;
    }

    private calculatePayouts(displayedSymbols: number[][]): { payouts: number[], totalPayout: number } {
        const verticalMatches = this.countVerticalMatches(displayedSymbols);
        const payouts: number[] = [];

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

    public spin(): ISlotResult {
      
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
