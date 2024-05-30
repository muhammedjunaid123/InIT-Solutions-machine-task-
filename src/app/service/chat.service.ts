import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from '@socket.io/component-emitter';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  socket!:Socket;
  constructor() {
    const authToken=localStorage.getItem('authToken')
    this.socket = io('http://localhost:3000',{ query: { token: authToken }})
    
  }

      sendMessage(data:any) {
    
  
      console.log(data);
      
    this.socket.emit('message',data);
  }

   getNewMessage = () => {
    this.socket.on('message', (message) =>{

      this.message$.next(message);
    });
    
    return this.message$.asObservable();
  };
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}