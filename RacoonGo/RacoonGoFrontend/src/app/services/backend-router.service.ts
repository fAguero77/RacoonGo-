import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {BackEndResponse, Event} from "../models/app.model";

@Injectable({
  providedIn: 'root'
})
export class BackendRouterService {
  private static readonly API_URL = 'https://localhost:7109/api/';

  // Headers
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Origin': '*'
  });

  public endpoints: any;

  constructor(private http: HttpClient) {
    let context = this;
    this.endpoints = {
      event: {
        addEvent: function(event: Event) { return context.api_create('Events', event) },
        getEvents: function()             { return context.api_list('Events', {}) }
      },
      user: {
        //register: function (email: string){ return context.api_create('registerUser', email) },
        //signIn: function (email: string)  { return context.api_create('signIn', email) },
        //deleteAccount: function (email: string | null) { return context.api_create('deleteUser', email)}
      }
    }
  }


  /******************* OPERACIONES API GENERICAS *******************/
  api_list(url: string, params: any) : Observable<HttpResponse<BackEndResponse<any>>> {
    //if(params) this.clearParameters(params);
    url = BackendRouterService.API_URL + url;
    return this.http.get<any>(url, { observe: 'response', params, headers: this.headers});
  }

  api_single(url: string, id: string) : Observable<HttpResponse<BackEndResponse<any>>> {
    url = BackendRouterService.API_URL + url + '/' + id;
    return this.http.get<any>(url, { observe: 'response', headers: this.headers});
  }

  api_create(url: string, data: any) : Observable<HttpResponse<BackEndResponse<any>>> {
    url = BackendRouterService.API_URL + url;
    return this.http.post<any>(url, data, { observe: 'response', headers: this.headers});
  }

  api_update(url: string, id: string, data: any, property: string = '') : Observable<HttpResponse<BackEndResponse<any>>> {
    url = BackendRouterService.API_URL + url + '/' + id + property;
    return this.http.put<any>(url, data, { observe: 'response', headers: this.headers});
  }

  api_delete(url: string, id: string) : Observable<HttpResponse<BackEndResponse<any>>> {
    url = BackendRouterService.API_URL + url + '/' + id;
    return this.http.delete<any>(url, { observe: 'response', headers: this.headers});
  }
}
