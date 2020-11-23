import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import  {io} from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket:any;
  //url donde se encuentra el socket
  readonly uri : string = 'https://desolate-fortress-14554.herokuapp.com/' //'ws://localhost:444'
  constructor() { 
    this.socket = io(this.uri);
  }
  
//evento listen de socket, recibe los datos de vuelta
  listen(eventName:string){
    return new Observable((subscriber)=>{
      this.socket.on(eventName,(data:any)=>{
        subscriber.next(data);
      })
    });
  }
  
//evento emit de socket, envia latitud y longitud
  emit(eventName:string, latitude:number, longitude:number){
    this.socket.emit(eventName,latitude,longitude);
  }
}
