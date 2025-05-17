import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  public generic: string;
  public required: string;
  public numeric: string;
  public betweenDate: string;
  public email: string;
  public password: string;
  public confirmPassword: string;


  constructor() {
    this.generic = 'Favor de verificar el tipo de dato introducido no es válido';
    this.required = 'Campo requerido';
    this.numeric = 'Solo se aceptan valores numéricos';
    this.betweenDate = 'Fecha no es válida';
    this.email = 'Favor de introducir un correo con el formato correcto';
    this.password = 'La contraseña debe contener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número.';
    this.confirmPassword = 'Las contraseñas no coinciden.';

  }

  between(min: any, max: any) {
    return 'El valor introducido debe de ser entre ' + min + ' y ' + max;
  }

  max(size: any) {
    return 'Se excedió la longitud del campo aceptada: ' + size;
  }

  min(size: any) {
    return 'El campo no cumple la longitud aceptada: ' + size;
  }
}
