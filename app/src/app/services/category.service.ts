import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from './Service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends Service {

  constructor(private _http: HttpClient) { 
    super();
  }

  getCategories(){
    return this._http.get(this.getApiRoute('/category'), this.headers);
  }
}
