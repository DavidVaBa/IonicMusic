import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SongsService {

  constructor(public http: HttpClient) {
    console.log('Hello SongsProvider Provider');
  }

  getSongs(){
    return this.http.get("http://10.16.0.110:8080/v1/songs")
    .map(response => response)
    .catch(error => error);
  }

}