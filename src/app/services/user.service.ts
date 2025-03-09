import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/User';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.api}/users`;

  constructor(private http: HttpClient) {}

  getUser(userId: string): Observable<User|null> {
    return this.http.get<User>(`${this.baseUrl}/${userId}`).pipe(
      catchError(() => of(null)) // Falls der Benutzer nicht existiert, geben wir null zurück
    );
  }

  addUser(user: User): Observable<User> {
    return this.getUser(user.userId).pipe(
      switchMap(existingUser => {
        if (existingUser) {
            console.log("USER EXISTIERT BEREITS IN DB", user.userId);
            return of(existingUser); // Falls der Benutzer existiert, geben wir ihn zurück
        } else {
            console.log("USER HINZUGEFÜGT!", user.userId);
            return this.http.post<User>(`${this.baseUrl}`, user); // Falls nicht, fügen wir ihn hinzu
        }
      })
    );
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
