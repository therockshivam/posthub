import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AbstractService {

  ApiUrl: string;
  path = '/auth/';

  constructor(globalService: GlobalService, private readonly httpClient: HttpClient) {
    super(globalService)
    this.ApiUrl = globalService.getBaseUrl();
  }

  register(data: any): Observable<any> {
    return this.httpClient.post<any>(this.ApiUrl + this.path + 'register', data);
  }

  login(data: any): Observable<any> {
    return this.httpClient.post<any>(this.ApiUrl + this.path +'login', data);
  }

  sendForgotPasswordRequest(data:any){
    return this.httpClient.post<any>(this.ApiUrl + this.path + 'reset-password', data);
  }

  varifyToken(token:string){
    return this.httpClient.get<any>(this.ApiUrl + this.path + 'reset-password/'+token);
  }

   resetPassword(token:string,data:any){
    return this.httpClient.post<any>(this.ApiUrl + this.path + 'reset-password/'+token, data);
  }

  logout() {
    return this.httpClient.get<any>(this.ApiUrl + this.path + 'logout', {headers: this.getHeaders()});
  }

  varifyEmail(token:string){
    return this.httpClient.get<any>(this.ApiUrl + this.path + 'email-verification/'+token);
  }

  refreshToken(){
    return this.httpClient.post<any>(this.ApiUrl + this.path + 'refresh', {});
  }
}
