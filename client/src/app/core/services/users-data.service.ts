import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShowUser } from '../../models/show-user';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  public constructor(private readonly http: HttpClient) { }

  public getAllUsers(): Observable<ShowUser[]> {
    return this.http.get<ShowUser[]>(`http://localhost:3000/users`);
  }

  public getUser(userId: string): Observable<ShowUser> {
    return this.http.get<ShowUser>(`http://localhost:3000/users/${userId}`);
  }

  public deleteUser(userId: string): Observable<ShowUser> {
    return this.http.delete<ShowUser>(`http://localhost:3000/users/${userId}`);
  }

  // public banUser(userId: string, description: {description: string}): Observable<ShowUser> {
  //   return this.http.put<ShowUser>(`http://localhost:3000/users/${userId}/banstatus`, description);
  // }

  // public unbanUser(userId: string): Observable<ShowUser> {
  //   return this.http.delete<ShowUser>(`http://localhost:3000/users/${userId}/banstatus`);
  // }

}
