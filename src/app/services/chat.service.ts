import { Injectable } from '@angular/core';
import { PusherService } from './pusher.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: {displayName: string, email: string};
  private _endPoint = 'http://localhost:2000'; // normally you use environment.ts
  private _channel: any;

  constructor(private _pusherService: PusherService, private _http: HttpClient) {
    this._channel = this._pusherService.getPusher().subscribe('chat');
  }

  join(param): Observable<any> {
    return this._http.post(`${this._endPoint}/join`, param)
    .pipe(tap(data => {
      this.user = param;
    }));
  }
}
