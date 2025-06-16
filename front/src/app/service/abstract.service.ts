import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AbstractService {

  constructor(public globalService: GlobalService) { }

getHeaders() {
  let headers: HttpHeaders = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers = headers.append('frontBaseUrl', this.globalService.getFrontBase());
  headers = headers.append('Authorization', `Bearer ${this.globalService.getAccessToken() ?? ''}`);
  headers = headers.append('refreshToken', this.globalService.getRefreshToken() ?? '');
  return headers;
}



  }
