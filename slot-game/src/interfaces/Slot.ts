export interface ISlotResult {
    positions: number[];
    symbols: number[][];
    payouts: number[];
    totalPayout: number;
}

export interface ISymbolConfig {
    [key: number]: number[];
}

export interface ISlotConfig {
    reelsCount: number;
    rowsCount: number;
    symbols: ISymbolConfig;
    lines: number[][];
    reels: number[][];
}