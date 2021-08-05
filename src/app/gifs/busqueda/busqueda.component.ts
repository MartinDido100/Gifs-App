import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent{

  constructor(private gifsService: GifsService){}

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>; //El ! le decis a ts que el elemento no va a ser nulo

  buscar(){
    const valor:string = this.txtBuscar.nativeElement.value;

    if(valor.trim().length === 0){
      return;
    }

    this.txtBuscar.nativeElement.value = '';
    this.gifsService.buscarGifs(valor);

  }
}
