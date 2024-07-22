import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  //url: string = 'https://ai.autorcpecas.pt/api/';
  url: string = 'http://127.0.0.1:8000/api/';

  httpOptions = {
    headers: new HttpHeaders({
      'Accept-Language': 'pt'
    })
  };

  login(data: any) {
    return this.http.post(this.url + 'login', data, this.httpOptions);
  }

  sendPhoto(data: any) {

    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept-Language': 'pt',
        'Authorization': 'Bearer ' + data.access_token
      })
    };

    return this.http.post(this.url + 'send-photo', data, this.httpOptions);
  }

  getCategories(data: any) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept-Language': 'pt',
        'Authorization': 'Bearer ' + data.access_token
      })
    };
    return this.http.get(this.url + 'get-categories', this.httpOptions);
  }

  getManufacturers(data: any) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept-Language': 'pt',
        'Authorization': 'Bearer ' + data.access_token
      })
    };

    return this.http.get(this.url + 'get-manufacturers', this.httpOptions);
  }

}
