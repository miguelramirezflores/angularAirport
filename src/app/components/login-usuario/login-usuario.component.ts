import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { AutenticadorJwtService } from '../../services/autenticador-jwt.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss']
})
export class LoginUsuarioComponent implements OnInit {

     loginForm !: FormGroup;
     ocultarPassword : boolean = true; 




  constructor( private usuarioService : UsuarioService, private autenticadorJwtService : AutenticadorJwtService, private router : Router  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
       usuario : new FormControl ('miguel',[Validators.required,Validators.minLength(4)]),
       password: new FormControl ('1234',[Validators.required,])
    });
  }

autenticarUsuario(){
  //aqui tengo que hacer el dialogo de carga !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


    this.usuarioService.autenticaUsuario(this.loginForm.controls.usuario.value,
      this.loginForm.controls.password.value).subscribe( data =>{
           if(data.jwt != undefined){
             this.autenticadorJwtService.almacenaJwt(data.jwt);
             this.router.navigate(['/listadoVuelos']);
             //cerrar las alertas !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
             this.usuarioService.emitirNuevoCambioEnUsuarioAutenticado();
           }else{
             //emitir alerta !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
             console.log("usuario incorrecto");
           }

      });




}




}
