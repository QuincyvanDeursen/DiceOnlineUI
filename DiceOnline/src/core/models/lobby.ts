import { Dice } from "./Dice";

export interface Lobby {
  id: string;              // Guid als string in JSON
  lobbyCode: string;
  players: string[];
  dices: Dice[];
  createdAt: string;       // DateTime komt als string uit de API
  updatedAt: string;
}