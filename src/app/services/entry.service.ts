import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entry } from '../models/entry.model';

const baseUrl = 'http://localhost:8080/api/entries';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Entry[]> {
    return this.http.get<Entry[]>(`${baseUrl}/list`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${baseUrl}/delete`);
  }

  crawlEntries(): Observable<any> {
    return this.http.get<Entry[]>(`${baseUrl}/crawl`);
  }

  filterEntries(parameters: any): Observable<Entry[]> {
    return this.http.post<Entry[]>(`${baseUrl}/listFiltered`, parameters);
  }
}
