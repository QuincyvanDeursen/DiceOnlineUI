import { DiceSettings } from "../models/DiceSettings";

export interface CreateLobbyCommand {
  PLayerName: string;
  ConnectionId: string;
  DiceSettings: DiceSettings;
}