import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest , HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map , finalize } from 'rxjs/operators';
import { AutenticadorJwtService } from './autenticador-jwt.service'
@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
urlWebApi = 'http://localhost:8080';
  constructor(private autenticadorJwt : AutenticadorJwtService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token : String |null  = this.autenticadorJwt.recuperaJwt();

    if(token){
      request = request.clone({headers: request.headers.set('Authorization','Bearer ' + token)});
    }


    if(!request.headers.has('Content-Type')){
      request = request.clone({headers: request.headers.set('Content-Type','application/json; charset=utf-8')})
    }

    request = request.clone({headers: request.headers.set("Accept","application/json")});
    const newUrl = {url: this.urlWebApi + request.url};

    request = Object.assign(request , newUrl);

    const newUrlWithParams = {urlWithParams: this.urlWebApi + request.urlWithParams};
    request = Object.assign(request,newUrlWithParams);

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) =>{
        if(event instanceof HttpResponse){
          // en este if puedes hacer un  console log de event y hacer una especie de log
        }
        return event;
      }),finalize(()=>{

      })
    );


  }





}
