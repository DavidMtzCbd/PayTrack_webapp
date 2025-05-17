import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FacadeService } from './facade.service';
import { ErrorsService } from './tools/errors.service';
import { ValidatorService } from './tools/validator.service';

const htttOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient,
    private facadeService: FacadeService,
    private errorsService: ErrorsService,
    private validatorService: ValidatorService
  ) { }

  public esquemaUsuario(){
    return{
      'first_name': '',
      'last_name': '',
      'email': '',
      'password': '',
      'confirmar_password': '',
    }
  }

  //validaciones para el formulario de registro
  public validarUsuario(data: any, editar: boolean){
    console.log("Validando usuario...", data);
    let error: any = [];

    if(!this.validatorService.required(data["first_name"])){
      error["first_name"] = this.errorsService.required;
    }
    if(!this.validatorService.required(data["last_name"])){
      error["last_name"] = this.errorsService.required;
    }
    if(!this.validatorService.required(data["email"])){
      error["email"] = this.errorsService.required;
    }else if(!this.validatorService.max(data["email"], 50)){
      error["email"] = this.errorsService.max(50);
    }else if(!this.validatorService.email(data["email"])){
      error["email"] = this.errorsService.email;
    }

    if (!editar) {
      if (!this.validatorService.required(data["password"])) {
        error["password"] = this.errorsService.required;
      } else if (!this.validatorService.strongPassword(data["password"])) {
        error["password"] = this.errorsService.password;
      }

      if (!this.validatorService.required(data["confirmar_password"])) {
        error["confirmar_password"] = this.errorsService.required;
      } else if (data["password"] !== data["confirmar_password"]) {
        error["confirmar_password"] = this.errorsService.confirmPassword;
      }
    }


    //return arreglo
    return error;
 }
    //Servicios HTTP

    //Funcion para registrar un nuevo usuario
    public registrarUsuario(data: any): Observable<any>{
      return this.http.post<any>(`${environment.url_api}/usuarios/`, data, htttOptions);
    }

    //Funcion para obtener el usuario por id
    public getUsuarioByID(idUser: Number){
      return this.http.get<any>(`${environment.url_api}/usuarios/?=${idUser}/`, htttOptions);
    }

    //Funcion para editar un usuario
    public editarUsuario(data: any): Observable<any>{
      var token = this.facadeService.getSessionToken();
      var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer'+ token});
      return this.http.put<any>(`${environment.url_api}/usuarios-edit/${data.id}/`, data, { headers:headers });
    }

    //Funcion para eliminar un usuario
    public eliminarUsuario(idUser: Number): Observable<any>{
      var token = this.facadeService.getSessionToken();
      var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer'+ token});
      return this.http.delete<any>(`${environment.url_api}/usuarios-edit/?id=${idUser}/`, { headers:headers });
    }


}
