import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
   
    baseUrl = 'http://localhost:8080/'
   
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
         console.log(request, next)
      const token = localStorage.getItem("jwt"); 
       let requestModify = request.clone({
          url:`${this.baseUrl}${request.url}`,
          headers:request.headers
      })
      if(request.url.includes('https'||'image')){
         requestModify = request
      }
        if(token){
         const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
         requestModify = requestModify.clone({ headers: headers });
         console.log("Authorization Header: ", headers);
     }
     console.log("Request URL: ", request.url);
     console.log("Request Headers: ", request.headers);
          return next.handle(requestModify).pipe(catchError((err) =>{ 
             console.log('error is: ', err.error);
          return of(err);
       }));
     }
  

}