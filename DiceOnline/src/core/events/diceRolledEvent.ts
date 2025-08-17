export interface DiceRolledEvent{
    playerName: string;
    results: { index: number; value: number }[];
}