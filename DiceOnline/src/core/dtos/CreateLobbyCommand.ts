import { Dice } from "../models/Dice";



export interface CreateLobbyCommand {
  PlayerName: string;
  ConnectionId: string;
  Dices: Dice[];
}