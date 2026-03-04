import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UrlDoc {
  _id: string;
  originalUrl: string;
  code: string;
  shortUrl: string;
  baseUrl: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class UrlService {
  private api = '/api/urls';

  constructor(private http: HttpClient) {}

  create(originalUrl: string): Observable<UrlDoc> {
    return this.http.post<UrlDoc>(this.api, { originalUrl });
  }
}
