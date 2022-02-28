import {HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {TokenService} from "./token.service";
import {catchError, tap} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";
import {NONE_TYPE} from "@angular/compiler";

const URL = 'http://127.0.0.1:8000/';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public api_link = URL + 'api-user/';

  private static handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    return alert(
      'Lỗi!!!! Vui lòng thử lại!');
  }

  private static log(message: string): any {
    console.log(message);
  }

  constructor(private http: HttpClient,
              private tokenService: TokenService,
              private jwtHelperService: JwtHelperService) { }

  public getAuthInfo(): Observable<any> {
    return this.http.get<any>(this.api_link + 'oauth2-info/')
  }

  public register(user: any): Observable<any> {
    return this.http.post<any>(this.api_link + 'user/', user)
      .pipe(
        tap(_ => AuthService.log('register'),
          catchError(AuthService.handleError))
      )
  }

  public login(user: any, authInfo: any): Observable<any> {
    this.tokenService.removeAccessToken();
    this.tokenService.removeRefreshToken();

    const body = new HttpParams()
      .set('username', user.username)
      .set('password', user.password)
      .set('client_id', authInfo.client_id)
      .set('client_secret', authInfo.client_secret)
      .set('grant_type', 'password')

    return this.http.post<any>(URL + 'o/token/', body)
      .pipe(
        tap(res => {
          this.tokenService.saveAccessToken(res.access_token);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }),
        catchError(AuthService.handleError)
      )
  }

  public isAuthenticated(): boolean {
    const accessToken = this.tokenService.getAccessToken()
    console.log(accessToken)
    // Check whether the token is expired and return
    // true or false
    return !accessToken
  }

  public refreshToken(refreshData: any): Observable<any> {
    this.tokenService.removeAccessToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams()
      .set('refresh_token', refreshData.refresh_token)
      .set('grant_type', 'refresh_token');
    return this.http.post<any>(URL + 'o/token', body)
      .pipe(
        tap(res => {
          this.tokenService.saveAccessToken(res.access_token);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }),
        catchError(AuthService.handleError)
      );
  }

  public getCurrentUser(accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + accessToken
    })

    // console.log(headers)
    // return this.http.get<any>(this.api_link + 'user/current-user/')
    return this.http.get<any>(this.api_link + 'user/current-user/', {
      headers: headers
    });
  }

  public logout(): void {
    this.tokenService.removeAccessToken();
    this.tokenService.removeRefreshToken();
  }

}
