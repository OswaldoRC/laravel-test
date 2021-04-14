import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from './Service';

@Injectable({
  providedIn: 'root'
})
export class BookService extends Service {

  constructor(private _http: HttpClient) { 
    super();
  }

  getBooks(page:number, limit: number){
    return this._http.get(this.getApiRoute(`/book?page=${page}&limit=${limit}`), this.headers);
  }
}
