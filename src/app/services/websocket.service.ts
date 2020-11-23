import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import  {io} from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket:any;
  readonly uri : string = 'https://desolate-fortress-14554.herokuapp.com/'
  constructor() { 
    this.socket = io(this.uri);
  }
  

  listen(eventName:string){
    return new Observable((subscriber)=>{
      this.socket.on(eventName,(data:any)=>{
        subscriber.next(data);
      })
    });
  }
  

  emit(eventName:string, latitude:number, longitude:number){
    this.socket.emit(eventName,latitude,longitude);
  }
}
