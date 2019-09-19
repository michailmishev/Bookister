import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserRegister } from '../../models/user-register';
import { UserLogin } from '../../models/user-login';
import { StorageService } from '../../core/services/storage.service';
import { tap } from 'rxjs/operators';
import * as JWT from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ShowUser } from 'src/app/models/show-user';
import { JWTService } from './jwt.service';


@Injectable(
  {
    providedIn: 'root',
  }
)
export class AuthService {
  private readonly userSubject$ = new BehaviorSubject<string | null>(this.username);
  redirectUrl: string;
  isLoggedIn = false;

  public constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageService,
    public jwtHelper: JwtHelperService,
    private router: Router,
    private readonly jwtService: JWTService,
  ) { }

  public get user$() {
    return this.userSubject$.asObservable();
  }

  private get username(): string | null {
    const token = this.storage.get('token');
    const username = this.storage.get('username') || '';
    if (token) {
      return username;
    }

    return null;
  }

  public register(user: UserRegister): Observable<any> {
    return this.http.post('http://localhost:3000/users', user);
  }

  public login(user: UserLogin): Observable<any> {

    return this.http.post('http://localhost:3000/session', user).pipe(
      tap((res: any) => {
        this.isLoggedIn = true;
        // this.userSubject$.next(res.user.name);
        this.storage.set('token', res.data);
        // this.storage.set('username', res.user.name);
        this.setUserId();
        this.setAdminStatus();
        this.isLoggedIn = true;
        if (this.redirectUrl) {
          this.router.navigate([`/posts`]);
          this.redirectUrl = null;
        }
      }
      ));
  }

  public logout(): void {
    this.storage.remove('token');
    this.storage.remove('username');
    this.storage.remove('userId');
    this.storage.remove('adminStatus');
    this.userSubject$.next(null);
    this.isLoggedIn = false;
    this.router.navigate([`/login`]);
  }

  public reverseToken(): any {
    const token = this.storage.get('token');
    if (!!token) {
      const decoded = this.jwtService.JWTDecoder(token);
      return decoded;
    }
    return '';
  }

  public setUserId(): void {
    const token: ShowUser = this.reverseToken();
    this.storage.set('userId', token.id);
  }

  public setAdminStatus(): number {
    const token: ShowUser = this.reverseToken();
    let isAdmin = 0;
    token.roles.forEach((role) => {
      if (role.name === 'Admin') {
        isAdmin = 1;
      }
    });
    this.storage.set('adminStatus', isAdmin.toString());
    return isAdmin;
  }

  public getBanstatus(): boolean {
    const token: ShowUser = this.reverseToken();
    if (token.banstatus.isBanned === true) {
      return true;
    }
    return false;
  }

  public isAuthenticated(): boolean {
    const token = this.storage.get('token');
    // Check whether the token is expired and return
    // true or false
    if (!!token) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

}
