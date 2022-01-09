import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  constructor(private http: HttpClient) {

  }

  avatar(username: String) {
    const avatar = `https://mc-heads.net/avatar/${username}`
    return avatar
  }
}
