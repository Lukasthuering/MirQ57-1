import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class ConfigService {
    baseUrl = "http://localhost:59887/api";
    responseUrl = "responses";
    userUrl = "users";
    eventUrl = "events";
  
    constructor(private http: HttpClient) { }
  }
  