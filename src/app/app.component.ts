import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../app/services/websocket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private websocketService:WebsocketService){}
  title = 'prueba-allride';
//coordenadas de inicio del mapa y donde se encuentra el marcador inicial, marcador cambia dependiendo de estas coordenadas
  location ={
      latitude : -33.462033,
      longitude : -70.611713,
      zoom : 15
  }
  //latitud y longitud que ingresa el usuario en pantalla
  inputLatitude = 0
  inputLongitude = 0
  myData:any;

  //evento click el cual crea evento socket emit para enviar las coordenadas ingresadas al backend
  onSendData(){
    this.websocketService.emit('getCoordenates',this.inputLatitude,this.inputLongitude)
  }

  //al iniciar la pagina
  ngOnInit(){
    //escucha evento 'createMarker' desde el socket y procesa la data recibida cuando haya cambios
      this.websocketService.listen('createMarker').subscribe((data) =>{
        this.myData = data
        console.log(this.myData.lat,this.myData.long)
        //cambia coordenadas con las recibidas por el socket lo cual cambia el marcador y centrado del mapa
        this.location.latitude = this.myData.lat
        this.location.longitude = this.myData.long
      })

  }
}

