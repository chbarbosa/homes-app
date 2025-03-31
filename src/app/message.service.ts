import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message: Subject<Message | null> = new Subject<Message | null>();

  constructor() { }

  public setErrorMessage(message: string): void {
    let msg : Message = {
      type: 'errors',
      text: message
    };
    this.message.next(msg);
  }

  public setInfoMessage(message: string): void {
    let msg : Message = {
      type: 'info',
      text: message
    };
    this.message.next(msg);
  }
  public cleanMessage(): void {
    this.message.next(null);
  }
}
