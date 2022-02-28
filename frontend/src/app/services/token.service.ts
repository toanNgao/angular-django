import { Injectable } from '@angular/core';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public getAccessToken(): any {
    return sessionStorage.getItem(ACCESS_TOKEN);
  }

  public getRefreshToken(): any {
    return sessionStorage.getItem(REFRESH_TOKEN);
  }

  public saveAccessToken(token: string): void {
    sessionStorage.setItem(ACCESS_TOKEN, token);
  }

  public saveRefreshToken(refreshToken: string): void {
    sessionStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  public removeAccessToken(): void {
    sessionStorage.removeItem(ACCESS_TOKEN);
  }

  public removeRefreshToken(): void {
    sessionStorage.removeItem(REFRESH_TOKEN);
  }
}
