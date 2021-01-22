import { Injectable , Output,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../interfaces/interfaces';
import{Observable, observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import{ DatosConJwt } from '../interfaces/interfaces';
import { Md5 } from 'ts-md5/dist/md5';
import { TagContentType } from '@angular/compiler';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioAutenticado! : Usuario;
  
  @Output()
  cambiosEnUsuarioAutenticado = new EventEmitter<Usuario>();
  constructor(private http: HttpClient ){ }


  autenticaUsuario (usuario : string, password : string) : Observable<DatosConJwt>{
    const md5= new Md5();

    var jsonObject = {
      usuario: usuario,
      password: md5.appendStr(password).end().toString()
    };


    return this.http.post<DatosConJwt>('/usuario/autentica',jsonObject).pipe(
      tap(data=>{
        //desde este metodo puedes mirar y comprobar los datos recibidos por ejemplo:
        //console.log(data["jwt"]);
        
    })
    );

  }




  getUsuarioAutenticado(incluirImagen:boolean = false):Observable<Usuario>{

    return this.http.get<Usuario>('usuario/getAutemticado?imagen=' + incluirImagen).pipe(
      tap(usuarioAutenticado=> {
        if ((this.usuarioAutenticado == null && usuarioAutenticado !=null  ) ||
            (this.usuarioAutenticado != null && usuarioAutenticado == null  ) ||
            (  this.usuarioAutenticado.id != usuarioAutenticado.id && this.usuarioAutenticado != null && usuarioAutenticado == null )) {
          this.emitirNuevoCambioEnUsuarioAutenticado();
          this.usuarioAutenticado=usuarioAutenticado;
      
        }
      })
        
      
    );

}

emitirNuevoCambioEnUsuarioAutenticado(){
  this.getUsuarioAutenticado(true).subscribe(usuarioAutenticado =>{
    this.cambiosEnUsuarioAutenticado.emit(usuarioAutenticado);
  })
}

ratificarPasswordUsuarioAtutenticado ( password : string): Observable<object>{
  var dto = {
    'password' : password
    };
    return this.http.post<object>('/usuario/ratificaPassword',dto);
}

cambiaPasswordUsuarioAutenticado ( nuevaPassword : string) : Observable<object>{
  var dto = {
    'password': nuevaPassword
      
    
  }
  return  this.http.post<object>('/usuario/modificaPassword',dto);
}

envioDatosUsuario (usuario : Usuario){
  return this.http.post<String>('/usuario/update',usuario).pipe(
    tap(strResult =>{
      //indico que se han realizado cambios en el usuario autenticado
      this.emitirNuevoCambioEnUsuarioAutenticado();
    })
  );
}

getUsuario(id : number, incluirImagen : boolean = false):Observable<Usuario>{
var url = '/usuario/get?id='+ id + '&imagen=' + incluirImagen ;
return  this.http.get<Usuario>(url);
}

}
