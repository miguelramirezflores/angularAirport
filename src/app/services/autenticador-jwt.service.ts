import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticadorJwtService {
  jwtPorSession !: string;
  constructor() { }

almacenaJwt( token : string){
  //esto guarda el jwt en tu navegador web por lo que no se podrian tener varias pestañas con varios usuarios
  localStorage.setItem('jwt',token)
  //esta otra instruccion almacena el jwt en la variable de nuestro servicio por lo que si abrimos otra pestaña y iniciamos sesion la aplicacion nos lo permite 
  //this.jwtPorSession =  token;
}
recuperaJwt(): string | null{
   //return this.jwtPorSession;
   return localStorage.getItem('jwt');
}
eliminaJwt(){
  // para que funcione la intruccion comentada y por tanto usar la variable debemos poner en la definicon de la variable string | null  sin eso no  no deja ponerlo a null
  // this.jwtPorSession = null;
  localStorage.removeItem('jwt');
}
}
