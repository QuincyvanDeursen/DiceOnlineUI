import { DiceSettings } from "./DiceSettings";

export interface Lobby {
  id: string;              // Guid als string in JSON
  lobbyCode: string;
  players: string[];
  diceSettings: DiceSettings;
  createdAt: string;       // DateTime komt als string uit de API
  updatedAt: string;
}