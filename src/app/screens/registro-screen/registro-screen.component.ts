import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { Location } from '@angular/common';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';

//Para usar jquery
declare var $: any;

@Component({
  selector: 'app-registro-screen',
  templateUrl: './registro-screen.component.html',
  styleUrls: ['./registro-screen.component.scss']
})

export class RegistroScreenComponent implements OnInit {

  @Input() usuario: string = "";
  @Input() datos_usuario: any = {};

  //Para las conrtraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  public usuarios: any = {};
  public token: string = "";
  public errors: any = {};
  public editar: boolean = false;
  public idUser: Number = 0;

  constructor(
    private location: Location,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public facadeService: FacadeService,
    public usuariosService: UsuariosService,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    //El primer if valida si existe un parametro en la URL
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable globla el valor del ID que viene por la URL
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID de usuario: ", this.idUser);
      //Al iiciiar la vista asignamos los datos del user
      this.usuarios = this.datos_usuario;
    }else{
      this.usuarios = this.usuariosService.esquemaUsuario();
      this.token = this.facadeService.getSessionToken();
    }
    //Imprimir datos del usuario en la consola
    console.log("Datos del usuario: ", this.usuarios);
  }

  public regresar(){
    this.location.back();
  }

  //Funciones para mostrar y ocultar las contraseñas

  showPassword(){
    if(this.inputType_1 == 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  showPwdConfirmar(){
    if(this.inputType_2 == 'password'){
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }else{
      this.inputType_2 = 'password';
      this.hide_2 = false;
  }

  }

  public registrar():void{
    //Validar
    this.errors = [];

    this.errors = this.usuariosService.validarUsuario(this.usuarios, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return;
    }

    //Invocacion del servicio
    //validar que la contraseña sea igual a la confirmacion
    if(this.usuarios.password == this.usuarios.confirmar_password){

      //Se consume el servicio de registro
      //Si todo es correcto se registra/llama al sercio
      this.usuariosService.registrarUsuario(this.usuarios).subscribe(
        (response)=>{
          alert("Usuario registrado correctamente");
          console.log("Usuario registrado correctamente", response);
          this.router.navigate(['/']);
        }, (error) =>{
          alert("Error al registrar el usuario");
        }
      );

    }else{
      alert("Las contraseñas no coinciden");
      this.usuarios.password = "";
      this.usuarios.confirmar_password = "";
    }
  }

  public actualizar(): void{
    //Validar
    this.errors = [];

    this.errors = this.usuariosService.validarUsuario(this.usuarios, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return;
    }

    //Invocacion del servicio
    //validar que la contraseña sea igual a la confirmacion
    if(this.usuarios.password == this.usuarios.confirmar_password){

      //Se consume el servicio de registro
      //Si todo es correcto se registra/llama al sercio
      this.usuariosService.editarUsuario(this.usuarios).subscribe(
        (response)=>{
          alert("Usuario actualizado correctamente");
          console.log("Usuario actualizado correctamente", response);
          this.router.navigate(['/']);
        }, (error) =>{
          alert("Error al actualizar el usuario");
        }
      );

    }else{
      alert("Las contraseñas no coinciden");
      this.usuarios.password = "";
      this.usuarios.confirmar_password = "";
    }
  }

}
