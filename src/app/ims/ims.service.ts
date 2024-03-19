// ims.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviorment';

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
      `${this.apiUrl}/office?office_name=${officeName}`,
      {},
      { headers }
    );
  }

  createFloor(floorNumber: string, officeId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    });

    return this.http.post<any>(
      `${this.apiUrl}/floor?floor_number=${floorNumber}&office_id=${officeId}`,
      {},
      { headers }
    );
  }

  submitSeatsData(floor_id: string, seats: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    });

    return this.http.post<any>(
      `${this.apiUrl}/seats`,
      { floor_id, seats },
      { headers }
    );
  }
}
