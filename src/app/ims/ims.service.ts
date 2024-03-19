import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../enviorment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IMSService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createOffice(officeName: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    });

    return this.http.post<any>(
      `${this.apiUrl}/office?office_name=`,
      { office_name: officeName },
      { headers }
    );
  }

  submitFloorData(officeId: string, floors: any[]): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    });

    return this.http.post<any>(
      `${this.apiUrl}/office/${officeId}/floors`,
      floors,
      { headers }
    );
  }
}
