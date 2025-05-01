import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Log } from '../models/log.model';

const baseUrl = 'http://localhost:8080/api/usage';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Log[]> {
    return this.http.get<Log[]>(`${baseUrl}/list`);
  }

}
