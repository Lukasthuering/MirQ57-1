import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Response } from '../models/response';

const options = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

@Injectable({
    providedIn: 'root'
})
export class ResponseService {
    private baseUrl: string;
    constructor(private http: HttpClient,
        config: ConfigService) {
        this.baseUrl = config.baseUrl + '/' + config.responseUrl
    }

    getResponseByEventAndUser(userId: number, eventId: number){
        return this.http.get<Response>(this.baseUrl + '?userId='+userId+'&eventId='+eventId);
    }

    createResponse(response: Response){
        return this.http.post(this.baseUrl, JSON.stringify(response), options);
    }

    updateResponse(response: Response){
        return this.http.put<Response>(this.baseUrl, JSON.stringify(response), options);
    }
}