import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message: Subject<string | null> = new Subject<string | null>();

  constructor() { }

  public setMessage(message: string | null): void {
    this.message.next(message);
  }
  public cleanMessage(): void {
    this.message.next(null);
  }
}
