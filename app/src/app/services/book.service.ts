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

  getBooks(page:number){
    return this._http.get(this.getApiRoute(`/book?page=${page}`), this.headers);
  }

  saveBook(body:any){
    return this._http.post(this.getApiRoute(`/book`), body, this.headers);
  }

  editBook(id:number, body:any){
    return this._http.put(this.getApiRoute(`/book/${id}`), body, this.headers);
  }
}
