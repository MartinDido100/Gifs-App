import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http: HttpClient) {
      //El const del service se ejecuta una sola vez
      if(localStorage.getItem('historial')){
        this._historial = JSON.parse( localStorage.getItem('historial')! );
      }
      this.resultados = JSON.parse( localStorage.getItem('resultado')! );
   }

  private _historial:string[] = [];
  private apiKey: string = 'tbPJhQ9Ujsj7IdIXggvQd7t33oS8vGLc';
  private baseUrl: string = 'https://api.giphy.com/v1/gifs/search?'

  
  public resultados: Gif[] = [];
  
  get historial(){
    if(this._historial.length > 10){ this._historial = this._historial.splice(0,10);}
    return [...this._historial];//Obtenes el historial
  }
  
  buscarGifs( query:string = '' ){
    query = query.trim().toLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      localStorage.setItem('historial', JSON.stringify(this._historial));
      //Lo guardas como json
    }
    
    const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit','10')
            .set('q',query);

    this.http.get<SearchGifsResponse>(`${this.baseUrl}`, { params })//Mandas los parametros
    .subscribe((res) => {
      this.resultados = res.data;
      localStorage.setItem('resultado',JSON.stringify(this.resultados));
    });

  }
}
