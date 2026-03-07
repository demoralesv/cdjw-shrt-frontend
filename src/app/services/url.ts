// comunicarse con el backend para crear las URLs cortas
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// estructura de datos que devuelve el backend
export interface UrlDoc {
  _id: string;
  originalUrl: string;
  code: string;
  shortUrl: string;
  baseUrl: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
// se comunica con la API de URLs
export class UrlService {
  private api = '/api/urls';

  constructor(private http: HttpClient) {}
  // el post
  create(originalUrl: string): Observable<UrlDoc> {
    return this.http.post<UrlDoc>(this.api, { originalUrl });
  }
}
