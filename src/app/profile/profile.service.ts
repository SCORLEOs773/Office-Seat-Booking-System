import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviorment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  updateUserName(newName: string): Observable<any> {
    const url = `${this.apiUrl}/user/edit-details`; // Modify the endpoint according to your API
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    });
    return this.http.patch(url, { user_fullname: newName }, { headers });
  }

  updateUserPassword(
    currentPassword: string,
    newPassword: string
  ): Observable<any> {
    const url = `${this.apiUrl}/user/change-password`; // Modify the endpoint according to your API
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    });
    const user_old_password = currentPassword;
    const user_new_password = newPassword;
    return this.http.patch(
      url,
      { user_old_password, user_new_password },
      { headers }
    );
  }
}
