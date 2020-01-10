import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { JwtAuthenticationService } from '../jwt-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  
  constructor(
    private authService: JwtAuthenticationService
  ) { }

  // The parameter request is the HttpRequest being sent out
  // In the method below, we will intercept the request, add header
  // and forward the request to next http handler
  intercept(request: HttpRequest<any>, next: HttpHandler){

    let authHeaderString = this.authService.getAuthenticateToken();
    let username = this.authService.getAuthenticatedUser();

    if( authHeaderString && username ){
      request = request.clone({
        setHeaders : {
          Authorization : authHeaderString
        }
      });
    }

    return next.handle(request);
  }
}