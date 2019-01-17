import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Response } from '../models/response';
import { User } from '../models/user';

const options = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl: string;
    constructor(private http: HttpClient,
        config: ConfigService) {
        this.baseUrl = config.baseUrl + '/' + config.userUrl
    }

    getUser(username: string, password: string){
        return this.http.get<User>(this.baseUrl + '?username='+username+'&password='+password);
    }

    getUserById(userId: string){
        return this.http.get<User>(this.baseUrl + '?userId='+userId);
    }

    createUser(user: User){
        return this.http.post(this.baseUrl, JSON.stringify(user), options);
    }
}