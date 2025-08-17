import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { JoinLobbyCommand } from '../dtos/JoinLobbyCommand';
import { CreateLobbyCommand } from '../dtos/CreateLobbyCommand';
import { SendMessageCommand } from '../dtos/SendMessageCommand';
import { LeaveLobbyCommand } from '../dtos/LeaveLobbyCommand';
import { RollDiceCommand } from '../dtos/RollDiceCommand';
import { environment } from '../../environment';



@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  private apiBaseUrl = `${environment.apiUrl}/lobbies`;

  constructor(private http: HttpClient) {}

  createLobby(command: CreateLobbyCommand): Observable<any> {
    return this.http.post(this.apiBaseUrl, command).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('API fout:', error);
        return throwError(() => error); // stuurt error naar subscriber
      })
    );
  }

  joinLobby(command: JoinLobbyCommand): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/join`, command).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('API fout:', error);
        return throwError(() => error); // stuurt error naar subscriber
      })
    );
  }

  leaveLobby(command: LeaveLobbyCommand): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/leave`, command).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('API fout:', error);
        return throwError(() => error); // stuurt error naar subscriber
      })
    );
  }

  getLobby(lobbyCode: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/${lobbyCode}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('API fout:', error);
        return throwError(() => error); // stuurt error naar subscriber
      })
    );
  }  

  sendMessage(command: SendMessageCommand): Observable<any> {
    console.log('Sending message:', command);
    return this.http.post(`${this.apiBaseUrl}/message`, command).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('API fout:', error);
        return throwError(() => error); // stuurt error naar subscriber
      })
    );
  }

  rollDice(command: RollDiceCommand): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/roll`, command).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('API fout:', error);
        return throwError(() => error); // stuurt error naar subscriber
      })
    );
  }
}
