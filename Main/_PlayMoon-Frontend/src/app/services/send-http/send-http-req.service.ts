import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import data from '../get-data/get-data';
@Injectable({
  providedIn: 'root'
})
export class SendHttpReqService {
  apiLink: String = data.apiLink

  constructor(private http: HttpClient) {

  }

  async sendGetReq(route: String) {
    try{
      const data = await this.http.get(`${this.apiLink}${route}`).toPromise()
      return {err: false, error: null, reqData: data.valueOf()}
    } catch(err) {
      return {err: true, error: err}
    }
  }
  async sendPostReq(route: String, body: Object) {
    try {
      const req = (await this.http.post(`${this.apiLink}${route}`, body, {responseType: 'json'}).toPromise()).valueOf()
      return {err: false, error: undefined, reqData: req}
    } catch(err) {
      return {err: true, error: err}
    }
  }
}
