export interface RollDiceCommand {
  lobbyCode: string;
  playerName: string;
  dices: { index: number; minValue: number; maxValue: number }[];
}