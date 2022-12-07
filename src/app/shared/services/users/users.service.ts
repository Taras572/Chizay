import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUsers } from '../../models/users/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private resourceUrl = environment.BACKEND_URL;
  private api = {
     users: `${this.resourceUrl}users`
  };
  constructor(
    private http: HttpClient
  ) { 

  }

  getByID(id: number): Observable<any> {
    return this.http.get<any>(`${this.api.users}/${id}`);
}

  get(): Observable<any> {
    return this.http.get<any>(this.api.users);
  }

  create(user: IUsers): Observable<any> {
    return this.http.post<any>(this.api.users, user);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.api.users}/${id}`);
  }

  update(users: IUsers, id: number): Observable<any> {
    return this.http.patch<any>(`${this.api.users}/${id}`, users);
  }

}
