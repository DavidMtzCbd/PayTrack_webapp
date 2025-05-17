import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacadeService } from './facade.service';
import { ErrorsService } from './tools/errors.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  constructor(
    private http: HttpClient,
    private facadeService: FacadeService,
    private errorsService: ErrorsService
  ) { }

  public esquemaPagos(){
    return{
      monto : '',
      fecha : '',
      tipo : '',
    }
  }

  //Funcion para obtener la lista de pagos
    public obtenerListaPagos (): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-pagos/`, {headers:headers});
  }

  //Funcion para eliminar un pago
  public eliminarPago(idUser: number): Observable<any>{
    var token = this.facadeService.getSessionToken();
    var headrers = new HttpHeaders({'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.delete<any>(`${environment.url_api}/pagos-edit/?id=${idUser}`, {headers:headrers});
  }
}
