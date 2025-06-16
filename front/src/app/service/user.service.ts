import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractService {
  ApiUrl: string;
  path = '/admin/';

  constructor(globalService: GlobalService, private readonly httpClient: HttpClient) {
    super(globalService);
    this.ApiUrl = globalService.getBaseUrl();
  }

   getUsers(){
    return this.httpClient.get<any>(this.ApiUrl + this.path + 'users',{headers: this.getHeaders()});
  }
}
