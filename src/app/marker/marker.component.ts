
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';

@Component({
    selector: 'app-marker',
    templateUrl:'./marker.component.html',
    styleUrls: ['./marker.component.css']
})
export class MarkerComponent implements OnInit{

    constructor(private websocketService:WebsocketService){}
    title = 'prueba-allride';
    location ={
        latitude : -33.462033,
        longitude : -70.611713,
        zoom : 15
    }
    // defaultLatitude = -33.462033;
    // defaultLongitude = -70.611713;
    // zoom = 15;
    inputLatitude = 0
    inputLongitude = 0
    myData:any;
    onSendData(){
      this.websocketService.emit('getCoordenates',this.inputLatitude,this.inputLongitude)
    }

    ngOnInit(){
        this.websocketService.listen('createMarker').subscribe((data) =>{
        this.myData = data
         console.log(this.myData.lat,this.myData.long)
        this.location.latitude = this.myData.lat
        this.location.longitude = this.myData.long
        })

    }

    


}