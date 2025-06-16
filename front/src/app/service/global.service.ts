import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  
  protocol: string;
  host: string;
  appName = 'posthub';

  private subject = new Subject<any>();

  constructor(private router: Router) {
    this.protocol = window.location.protocol;
    this.host = window.location.hostname;
  }

  public postLogin(data:any) {
    this.setToken(data.accessToken);
    this.setRefreshToken(data.refreshToken)
    this.setUserId(data.userId);
    this.setUserRole(data.roleId);
    this.setUsername(data.userCode);
  }


  public setUsername(username:string) {
    localStorage.setItem('username', username);
  }

  public getUsername() {
    return localStorage.getItem('username');
  }
  public setUserId(userId:number) {
    localStorage.setItem('userId', userId.toString());
  }

  public getUserId() {
    return localStorage.getItem('userId');
  }

  public setToken(accessToken:string) {
    localStorage.setItem('accessToken', accessToken);
  }

  public getAccessToken() {
    return localStorage.getItem('accessToken');
  }
  public setRefreshToken(refreshToken:string) {
    localStorage.setItem('refreshToken', refreshToken);
  }

  public getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }
  public setUserRole(roleId:number) {
    localStorage.setItem('roleId', roleId.toString());
    console.log(roleId);
  }
  public getuserRole() {
    return localStorage.getItem('roleId');
  }
  public logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  // getTheme():any{
  //   let primaryColor='#2EADEF', secondaryColor='#6E778AA6',organizationId,organizationCode;
  //   primaryColor=localStorage.getItem('primaryColor');
  //   secondaryColor=localStorage.getItem('secondaryColor');
  //   organizationId=localStorage.getItem('organizationId');
  //   organizationCode=this.getOrganizationCode();
  //   this.setOrganizationTheme(primaryColor,secondaryColor,organizationId,organizationCode)
  // }

 

//  setTheme(primaryColor: string,secondaryColor: string,organizationId:string, organizationCode:string): void {
//   localStorage.setItem('primaryColor', primaryColor);
//   localStorage.setItem('secondaryColor', secondaryColor);
//   localStorage.setItem('organizationId',organizationId);
//   localStorage.setItem('organizationCode',organizationCode);
//   document.documentElement.style.setProperty('--org-primary-color', primaryColor, 'important');
//   document.documentElement.style.setProperty('--org-secondary-color', secondaryColor, 'important');
//   }

  getFrontBase(): string {
    return this.protocol + '//' + this.host;
  }

  getBaseUrl(): string {
    const port = window.location.port ? `:${window.location.port}` : '';
    return this.protocol + '//' + this.host + port + '/' + this.appName;
  }

  getOAuth2RedirectUri() {
    return this.protocol + '//' + this.host + '/oauth2/redirect';
  }

  getGoogleAuthUri() {
    return (
      this.getBaseUrl() +
      '/oauth2/authorize/google?redirect_uri=' +
      this.getOAuth2RedirectUri()
    );
  }
  getFacebookAuthUri() {
    return (
      this.getBaseUrl() +
      '/oauth2/authorize/facebook?redirect_uri=' +
      this.getOAuth2RedirectUri()
    );
  }
  getGithubAuthUri() {
    return (
      this.getBaseUrl() +
      '/oauth2/authorize/github?redirect_uri=' +
      this.getOAuth2RedirectUri()
    );
  }

  fireChangeEvent(componentName: string, message: any) {
    this.subject.next({ componentName: componentName, text: message });
  }

  onChangeEvent(): Observable<any> {
    return this.subject.asObservable();
  }


  setFeedData(encodedData: string) {
    localStorage.setItem('feedData',encodedData);
  }

  getFeedData() {
    return localStorage.getItem('feedData');
  }

  removeToken() {
    localStorage.removeItem('accessToken');
  }

  removeRefreshToken() {
    localStorage.removeItem('refreshToken');
  }

  removeUserId() {
    localStorage.removeItem('userId');
  }

  removeUserRole() {
    localStorage.removeItem('roleId');
  }

setThemeMode(isDarkTheme: boolean) {
  localStorage.setItem('isDarkTheme', isDarkTheme.toString());
}

getThemeMode(): boolean {
  const value = localStorage.getItem('isDarkTheme');
  return value === 'true';
}


}
export const ACCESS_TOKEN = 'accessToken';
